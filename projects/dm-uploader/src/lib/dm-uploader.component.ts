import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input, OnChanges,
    OnDestroy,
    Optional,
    Output,
    Self,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DominusUploaderFileComponent} from "./components/dominus-uploader-file/dominus-uploader-file.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DominusUploaderImageComponent} from "./components/dominus-uploader-image/dominus-uploader-image.component";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {
    DOMINUS_UPLOADER_INTL,
    DominusFile,
    DominusImageSize,
    DominusQueuedFile,
    DominusUploaderIntl
} from "./dm-uploader";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {ThemePalette} from "@angular/material/core";
import {catchError, fromEvent, of, Subject, takeUntil} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    selector: 'dm-uploader',
    standalone: true,
    styleUrl: './dm-uploader.component.scss',
    templateUrl: './dm-uploader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: DmUploaderComponent
        }
    ],
    imports: [
        CommonModule,
        DominusUploaderFileComponent,
        MatIconModule,
        MatButtonModule,
        DominusUploaderImageComponent
    ],
})
export class DmUploaderComponent implements OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor, MatFormFieldControl<DominusFile[]> {
    static nextId = 0;

    @ViewChild('uploaderContainer') uploaderContainer!: ElementRef;
    @ViewChild('fileInput') fileInput!: ElementRef;

    /**
     * Endpoint that handles storing the file
     */
    @Input({required: true}) fileSaveEndpoint!: string;
    @Input() fileSaveEndpointRequestMethod = 'POST';
    @Input() fileSaveEndpointRequestHeaders?: HttpHeaders | { [p: string]: string | string[] } | Promise<HttpHeaders | {
        [p: string]: string | string[]
    }>;

    /**
     * Endpoint to be called when deleting a file or clearing all uploaded files if [multiple] = true
     */
    @Input() fileDeleteEndpoint?: string;
    @Input() fileDeleteEndpointRequestMethod = 'DELETE';
    @Input() fileDeleteEndpointRequestHeaders?: HttpHeaders | {
        [p: string]: string | string[]
    } | Promise<HttpHeaders | { [p: string]: string | string[] }>;

    /**
     * Allow multiple files?
     */
    @Input() multiple = false;

    /**
     * Uploader type
     */
    @Input() type: 'file-uploader' | 'image-uploader' = 'file-uploader';

    @Input() progressBarColor: ThemePalette = 'primary';

    /**
     * A list of allowed file extensions(lowercase), if empty the extension check is skipped.
     * Example: ['txt', 'xlsx', ...]
     */
    @Input() allowedExtensions: string[] = [];

    /**
     * Maximum file size in bytes
     */
    @Input() maxFileSize = 5 * 1024 * 1024;

    @Input() allowDeleteAction = true;

    /**
     * Whether to show a preview when the uploaded file is an image.
     * Does not apply image-uploader type
     */
    @Input() showImagePreview = true;

    /**
     * Styles applied directly to the image preview img element
     * [ngStyle] compatible object
     */
    @Input() imagePreviewStyles: { [style: string]: string } = {'max-width': '200px'};

    /**
     * Limits the maximum width and/or height of uploaded images.
     * Multiple sizes can be added in the array, for example you can
     * check if the uploaded image has a width of 100 by passing [maxImageSize]="[{width: 100}]"
     */
    @Input() maxImageSize?: DominusImageSize[];

    /**
     * Event triggered when all the files in the upload queue are uploaded.
     */
    @Output() uploadFinished = new EventEmitter<DominusFile[]>();

    @HostBinding() id = `dm-uploader-${DmUploaderComponent.nextId++}`;

    stateChanges = new Subject<void>();
    focused = false;

    protected containerClasses: { [klass: string]: boolean } = {
        'container': true,
        'multiple': false,
        'mat-form-field': false,
        'dragover': false,
        'image-uploader': false
    };
    protected _value: DominusFile[] = [];
    protected lastFileId = 0;
    protected filesQueue = new Map<number, DominusQueuedFile>();
    protected uploaderType: string = '';
    protected maxImageSizeText: string = '';
    protected hasFiles = false;
    protected _onChange = (files: DominusFile[]) => files;
    protected _onTouched = () => {};
    protected isInAngularForm = false;
    protected readonly DominusUploaderIntl = DominusUploaderIntl;
    protected readonly componentDestroyed$ = new Subject<void>();

    private _disabled: boolean = false;
    private _required: boolean = false;
    private _placeholder: string = '';

    constructor(
        protected readonly http: HttpClient,
        protected readonly changeDetector: ChangeDetectorRef,
        @Optional() @Inject(DOMINUS_UPLOADER_INTL) public readonly intl: Record<DominusUploaderIntl, string>,
        @Optional() @Inject(MAT_FORM_FIELD) public matFormField: MatFormField,
        @Optional() @Self() public ngControl: NgControl,
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }

        this.containerClasses['mat-form-field'] = !!this.matFormField;

        this.intl = {
            [DominusUploaderIntl.UNKNOWN_ERROR]: 'Upload Failed!',
            [DominusUploaderIntl.INVALID_EXTENSION]: 'Invalid file extension!',
            [DominusUploaderIntl.MAX_SIZE_EXCEEDED]: 'File size is too big!',
            [DominusUploaderIntl.MULTIPLE_NO_FILES_MESSAGE]: 'Drop files here.',
            [DominusUploaderIntl.SINGLE_NO_FILES_MESSAGE]: 'No file',
            [DominusUploaderIntl.ALLOWED_EXTENSIONS]: 'Allowed Extensions:',
            [DominusUploaderIntl.MULTIPLE_ADD_FILES_BTN]: 'Add files',
            [DominusUploaderIntl.NO_IMAGE_MESSAGE]: 'Drop images here.',
            [DominusUploaderIntl.IMAGE_SIZE_CHECK_FAILED]: 'Maximum width or height exceeded.',
            [DominusUploaderIntl.IMAGE_SIZE_CHECK_TEXT]: 'Allowed image dimensions (HxW):',
        };

        if (intl) {
            Object.assign(this.intl, intl);
        }
    }

    ngOnChanges()
    {
        this.uploaderType = this.type + (this.multiple ? '-multiple' : '-single');
        this.containerClasses['multiple'] = this.multiple;
        this.containerClasses['image-uploader'] = this.type === 'image-uploader';

        if (this.maxImageSize?.length) {
            this.maxImageSizeText = this.maxImageSize.map(size => size.height + 'x' + size.width).join(', ');
        }

        this.changeDetector.markForCheck();
    }

    ngAfterViewInit() {
        const uploaderContainer = this.matFormField?._elementRef.nativeElement || this.uploaderContainer.nativeElement;
        fromEvent<DragEvent>(uploaderContainer, 'dragover').pipe(takeUntil(this.componentDestroyed$)).subscribe((evt) => this.onDragOver(evt));
        fromEvent<DragEvent>(uploaderContainer, 'dragleave').pipe(takeUntil(this.componentDestroyed$)).subscribe((evt) => this.onDragLeave(evt));
        fromEvent<DragEvent>(uploaderContainer, 'drop').pipe(takeUntil(this.componentDestroyed$)).subscribe((evt) => this.onFilesDropped(evt));
    }

    /**
     * Opens the file input dialog.
     */
    openFilesInput() {
        this.fileInput.nativeElement.click()
    }

    get value(): DominusFile[] {
        return this._value;
    }

    @Input()
    set value(value: DominusFile[]) {
        value = value || [];

        if (!Array.isArray(value)) {
            throw new Error('Uploader value must be an array of type DominusFile[].');
        }

        this._value = value;
        this.hasFiles = this._value.length > 0;
        this.changeDetector.markForCheck();
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return (this.ngControl && this.ngControl.invalid && this.ngControl.touched) as boolean;
    }

    setDescribedByIds() {
    }

    onContainerClick() {
        this._onTouched();
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return true;
    }

    get empty() {
        return this.value.length === 0;
    }

    get placeholder() {
        return this._placeholder;
    }

    @Input()
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    @Input()
    set disabled(state: boolean) {
        this._disabled = coerceBooleanProperty(state);
        this.stateChanges.next();
    }

    get disabled() {
        return this._disabled;
    }

    @Input()
    set required(state: boolean) {
        this._required = coerceBooleanProperty(state);
        this.stateChanges.next();
    }

    get required() {
        return this._required;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
        this.isInAngularForm = true;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    writeValue(val: DominusFile[]): void {
        this.value = val;
    }

    protected async onFilesAdded(addedFiles: FileList) {
        if (!(addedFiles && addedFiles.length)) {
            return;
        }

        const files = this.multiple ? addedFiles : [addedFiles[0]];

        for (let i = files.length; i--;) {
            const file: File = files[i];
            const error = await this.checkFile(file);

            const queuedDominusFile: DominusQueuedFile = {
                id: ++this.lastFileId,
                name: file.name,
                progress: 0,
                size: file.size,
                error: error,
                canRetryUpload: error === '',
                imagePreviewUrl: file.type.includes('image') ? URL.createObjectURL(file) : '',
                file: file
            };

            this.filesQueue.set(queuedDominusFile.id, queuedDominusFile);

            if (error === '') {
                this.uploadFile(queuedDominusFile);
            } else {
                this.changeDetector.markForCheck();
            }
        }

        this.fileInput.nativeElement.value = '';
    }

    protected async uploadFile(queuedDominusFile: DominusQueuedFile) {
        const formData = new FormData();
        const file = queuedDominusFile.file;

        formData.append("file", file);

        const requestHeaders = this.fileSaveEndpointRequestHeaders instanceof Promise ? await this.fileSaveEndpointRequestHeaders : this.fileSaveEndpointRequestHeaders;

        this.http.request(this.fileSaveEndpointRequestMethod, this.fileSaveEndpoint, {
            reportProgress: true,
            observe: 'events',
            body: formData,
            headers: requestHeaders
        }).pipe(
            catchError(() => {
                queuedDominusFile.error = this.intl[DominusUploaderIntl.UNKNOWN_ERROR];
                queuedDominusFile.progress = 0;
                this.changeDetector.markForCheck();
                return of(null);
            }),
        ).subscribe(event => {
            if (event) {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        queuedDominusFile.progress = Math.floor(event.loaded / (event.total || 1) * 100);
                        this.changeDetector.markForCheck();
                        break;

                    case HttpEventType.Response:
                        if (!this.multiple) {
                            this._value = [];
                        }
                        this._value.push({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            imagePreviewUrl: file.type.includes('image') ? URL.createObjectURL(file) : '',
                            data: event.body || {}
                        });

                        this.filesQueue.delete(queuedDominusFile.id);
                        this.hasFiles = true;
                        this.changeDetector.markForCheck();
                        this._onChange(this.value);
                        this.uploadFinished.next(this.value);
                        break;
                }
            }
        });
    }

    protected retryUpload(fileId: number) {
        const queuedFile = this.filesQueue.get(fileId);

        if (!queuedFile) {
            return;
        }

        if (!queuedFile.canRetryUpload) {
            this.filesQueue.delete(fileId);
            return;
        }

        this.uploadFile(queuedFile);
    }

    /**
     * Removes an uploaded file by index
     * @param fileIndex
     */
    protected async removeFile(fileIndex: number) {
        const file = this._value.splice(fileIndex, 1)[0];

        const requestHeaders = this.fileDeleteEndpointRequestHeaders instanceof Promise ? await this.fileDeleteEndpointRequestHeaders : this.fileDeleteEndpointRequestHeaders;

        if (this.fileDeleteEndpoint) {
            this.http.request(
                this.fileDeleteEndpointRequestMethod,
                this.fileDeleteEndpoint,
                {
                    body: [file],
                    headers: requestHeaders
                }).subscribe(() => {

            });
        }

        this.hasFiles = this._value.length > 0;
        this.changeDetector.markForCheck();
    }

    private onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.containerClasses['dragover'] = true;
        this.changeDetector.markForCheck();
    }

    private onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.containerClasses['dragover'] = false;
        this.changeDetector.markForCheck();
    }

    private onFilesDropped(evt: DragEvent) {
        const files = evt.dataTransfer?.files;
        if (files) {
            evt.preventDefault();
            evt.stopPropagation();
            this.onFilesAdded(files);
        }

        this.containerClasses['dragover'] = false;
        this.changeDetector.markForCheck();
    }

    private async checkFile(file: File): Promise<string> {
        const allowedExtensions = this.allowedExtensions;

        if (allowedExtensions.length) {
            const dotIndex = file.name.lastIndexOf('.');
            let extensionValid;

            if (dotIndex < 0) {
                extensionValid = false;
            } else {
                const fileExtension = file.name.substring(dotIndex + 1).toLowerCase();
                extensionValid = allowedExtensions.indexOf(fileExtension) !== -1;
            }

            if (!extensionValid) {
                return this.intl[DominusUploaderIntl.INVALID_EXTENSION];
            }
        }

        if (file.size > this.maxFileSize) {
            return this.intl[DominusUploaderIntl.MAX_SIZE_EXCEEDED];
        }

        if (file.type.includes('image') && this.maxImageSize?.length) {
            const maxImageSize = this.maxImageSize;
            const imageSizes = await this.getImageSize(URL.createObjectURL(file));
            let checkFail = true;
            for (let i = maxImageSize.length; i--;) {
                const sizeCheck = maxImageSize[i];

                if (
                    (sizeCheck.width !== undefined && sizeCheck.height !== undefined)
                    && sizeCheck.width === imageSizes.width
                    && sizeCheck.height === imageSizes.height
                ) {
                    checkFail = false;
                    break;
                } else if (sizeCheck.width !== undefined && sizeCheck.height === undefined && sizeCheck.width === imageSizes.width) {
                    checkFail = false;
                    break;
                } else if (sizeCheck.height !== undefined && sizeCheck.width === undefined && sizeCheck.height === imageSizes.height) {
                    checkFail = false;
                    break;
                }
            }

            if (checkFail) {
                return this.intl[DominusUploaderIntl.IMAGE_SIZE_CHECK_FAILED];
            }
        }

        return '';
    }


    private async getImageSize(url: string): Promise<{ width: number; height: number; }> {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                });
            };

            img.onerror = () => {
                reject('Error loading image');
            };

            img.src = url;
        });
    }


    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
        this.stateChanges.complete();
    }
}
