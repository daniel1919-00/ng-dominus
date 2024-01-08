import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges, OnDestroy,
    Optional,
    Output,
    Self, SimpleChanges,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {NgControl} from "@angular/forms";
import {
    DM_UPLOADER_INTL,
    DominusFile,
    DominusImageSize,
    DominusQueuedFile,
    DmUploaderIntl
} from "./dm-uploader";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {ThemePalette} from "@angular/material/core";
import {catchError, of} from "rxjs";
import {CustomAngularMaterialFormControl} from "../shared/custom-angular-material-form-control";
import {DmFileSizePipe} from "./dm-uploader-file-size.pipe";
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
        MatIconModule,
        MatButtonModule,
        DmFileSizePipe,
        MatProgressBarModule
    ],
})
export class DmUploaderComponent extends CustomAngularMaterialFormControl<DominusFile[]> implements OnChanges, AfterViewInit, OnDestroy {
    static nextId = 0;

    id = `dm-uploader-${DmUploaderComponent.nextId++}`;

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

    @Input() displayAs: 'list' | 'grid' = 'list'

    @Input() progressBarColor: ThemePalette = 'primary';

    /**
     * A list of allowed file extensions(lowercase), if empty the extension check is skipped.
     * Example: ['txt', 'xlsx', ...]
     */
    @Input() allowedExtensions: string[] = [];

    /**
     * Maximum file size in bytes. Default: 5MB
     */
    @Input() maxFileSize = 5 * 1024 * 1024;

    /**
     * Whether to show a preview when the uploaded file is an image.
     * Does not apply image-uploader type
     */
    @Input() showImagePreview = true;

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

    protected containerClasses: { [className: string]: boolean } = {
        'mat-form-field': false,
        'dragover': false
    };
    protected _value: DominusFile[] = [];
    protected lastFileId = 0;
    protected filesQueue = new Map<number, DominusQueuedFile>();
    protected maxImageSizeText: string = '';
    protected allowedExtensionsText: string = '';
    protected hasFiles = false;
    protected readonly DmUploaderIntl = DmUploaderIntl;
    protected readonly intl: Record<DmUploaderIntl, string>;

    private viewInit = false;
    @ViewChild('fileInput') private readonly fileInput!: ElementRef;

    constructor(
        protected readonly http: HttpClient,
        protected readonly changeDetector: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @Inject(DM_UPLOADER_INTL) intl?: Record<DmUploaderIntl, string>,
        @Optional() @Inject(MAT_FORM_FIELD) parentFormField?: MatFormField,
    ) {
        super(ngControl);

        if(parentFormField) {
            this.containerClasses['mat-form-field'] = true;
        }

        this.intl = Object.assign({
            [DmUploaderIntl.NO_FILES_MSG]: 'Drag&drop your files or click to browse',
            [DmUploaderIntl.UNKNOWN_ERROR]: 'Upload Failed!',
            [DmUploaderIntl.INVALID_EXTENSION]: 'Invalid file extension!',
            [DmUploaderIntl.MAX_SIZE_EXCEEDED]: 'File size is too big!',
            [DmUploaderIntl.ALLOWED_EXTENSIONS]: 'Allowed Extensions',
            [DmUploaderIntl.MAX_FILE_SIZE]: 'Maximum file size',
            [DmUploaderIntl.IMAGE_SIZE_CHECK_FAILED]: 'Maximum width or height exceeded.',
            [DmUploaderIntl.IMAGE_SIZE_CHECK_TEXT]: 'Allowed image dimensions (HxW)',
        }, intl || {});
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['allowedExtensions']) {
            this.allowedExtensionsText = this.allowedExtensions.join(', ');
        }

        if (changes['maxImageSize'] && this.maxImageSize?.length) {
            this.maxImageSizeText = this.maxImageSize.map(size => size.height + 'x' + size.width).join(', ');
        }

        if(this.viewInit) {
            this.changeDetector.markForCheck();
            this.stateChanges.next();
        }
    }

    ngAfterViewInit() {
        this.viewInit = true;
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
    set value(value: DominusFile[] | DominusFile | null) {
        value = value || [];

        if (!Array.isArray(value)) {
            value = [value];
        }

        this._value = value;
        this.hasFiles = this._value.length > 0;
        this.onChange(value);
        this.changeDetector.markForCheck();
        this.stateChanges.next();
    }

    override get shouldLabelFloat() {
        return true;
    }

    get empty() {
        return this.value.length === 0;
    }

    protected onFilesAdded(addedFiles: FileList) {
        if (!(addedFiles && addedFiles.length)) {
            return;
        }

        const files = this.multiple ? addedFiles : [addedFiles[0]];
        for (let i = files.length; i--;) {
            const file: File = files[i];
            this.checkFile(file).then(error => {
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
                this.changeDetector.markForCheck();

                if (error === '') {
                    this.uploadFile(queuedDominusFile).then();
                }
            });
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
                queuedDominusFile.error = this.intl[DmUploaderIntl.UNKNOWN_ERROR];
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

                        const uploadedFiles = this._value;

                        uploadedFiles.push({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            imagePreviewUrl: file.type.includes('image') ? URL.createObjectURL(file) : '',
                            data: event.body || {}
                        });

                        this.removeFromQueue(queuedDominusFile.id);
                        this.value = uploadedFiles;
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
            this.removeFromQueue(fileId);
            return;
        }

        this.uploadFile(queuedFile).then();
    }

    /**
     * Removes an uploaded file by index
     * @param fileIndex
     */
    protected async removeFile(fileIndex: number) {
        const file = this._value.splice(fileIndex, 1)[0];

        if (this.fileDeleteEndpoint) {
            const requestHeaders = this.fileDeleteEndpointRequestHeaders instanceof Promise ? await this.fileDeleteEndpointRequestHeaders : this.fileDeleteEndpointRequestHeaders;
            this.http.request(
                this.fileDeleteEndpointRequestMethod,
                this.fileDeleteEndpoint,
                {
                    body: [file],
                    headers: requestHeaders
                }).subscribe();
        }

        this.hasFiles = this._value.length > 0;
        this.changeDetector.markForCheck();
    }

    protected removeFromQueue(fileId: number) {
        this.filesQueue.delete(fileId);
    }

    protected onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.containerClasses['dragover'] = true;
        this.changeDetector.markForCheck();
    }

    protected onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.containerClasses['dragover'] = false;
        this.changeDetector.markForCheck();
    }

    protected onFilesDropped(evt: DragEvent) {
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
                return this.intl[DmUploaderIntl.INVALID_EXTENSION];
            }
        }

        if (file.size > this.maxFileSize) {
            return this.intl[DmUploaderIntl.MAX_SIZE_EXCEEDED];
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
                return this.intl[DmUploaderIntl.IMAGE_SIZE_CHECK_FAILED];
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

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.uploadFinished.complete();
    }
}
