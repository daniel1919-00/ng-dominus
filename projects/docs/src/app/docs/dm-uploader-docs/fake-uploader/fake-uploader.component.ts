import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldControl} from "@angular/material/form-field";
import {finalize, interval, take, takeUntil} from "rxjs";
import {
    DominusUploaderFileComponent
} from "../../../../../../dm-uploader/src/lib/components/dominus-uploader-file/dominus-uploader-file.component";
import {
    DominusUploaderImageComponent
} from "../../../../../../dm-uploader/src/lib/components/dominus-uploader-image/dominus-uploader-image.component";
import {DmUploaderComponent} from "../../../../../../dm-uploader/src/lib/dm-uploader.component";
import {DominusQueuedFile} from "../../../../../../dm-uploader/src/lib/dm-uploader";

@Component({
    selector: 'app-fake-uploader',
    standalone: true,
    imports: [CommonModule, DominusUploaderFileComponent, MatIconModule, MatButtonModule, DominusUploaderImageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: FakeUploaderComponent
        }
    ],
    styles: `
        input[type="file"] {
            display: none;
        }

        .container {
            display: flex;
            flex-direction: column;
            min-height: 100px;
            padding: 10px;

            &.multiple:not(.mat-form-field),
            &.image-uploader:not(.mat-form-field) {
                border: 1px dotted var(--dominus-uploader-file-default-border-color, #cecece);
                &.dragover {
                    border-color: var(--dominus-uploader-file-hover-border-color, #6495EDFF);
                }
            }

            .image-previews {
                display: flex;
                flex-wrap: wrap;
            }

            .no-files-multiple {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .no-files-single {
                display: flex;
                align-items: center;
                >button {
                    margin-left: 15px;
                }
            }

            .actions {
                display: flex;
                margin-bottom: 25px;
                >button {
                    &:not(:last-child) {
                        margin-right: 8px;
                    }
                }
            }
        }
    `,
    template: `
        <div #uploaderContainer [ngClass]="containerClasses">
            <ng-container [ngSwitch]="uploaderType">
                <ng-container *ngSwitchCase="'file-uploader-multiple'">
                    <div class="actions">
                        <button type="button" mat-raised-button color="primary" (click)="openFilesInput()">
                            <mat-icon>add</mat-icon>
                            {{ intl[DominusUploaderIntl.MULTIPLE_ADD_FILES_BTN] }}
                        </button>
                    </div>
                    <ng-container *ngIf="hasFiles || filesQueue.has(lastFileId); else noFilesMultiple">
                        <dominus-uploader-file
                            *ngFor="let file of _value; let i = index"
                            [fileIndex]="i"
                            [imagePreviewStyles]="imagePreviewStyles"
                            [file]="file"
                            error=""
                            [progressBarColor]="progressBarColor"
                            [allowDeleteAction]="allowDeleteAction"
                            [showImagePreview]="showImagePreview"
                            (fileDelete)="removeFile($event)"
                        ></dominus-uploader-file>

                        <dominus-uploader-file
                            *ngFor="let queuedFile of filesQueue.entries()"
                            [fileIndex]="queuedFile[0]"
                            [error]="queuedFile[1].error"
                            [imagePreviewStyles]="imagePreviewStyles"
                            [uploadProgress]="queuedFile[1].progress"
                            [file]="queuedFile[1]"
                            [progressBarColor]="progressBarColor"
                            [allowDeleteAction]="allowDeleteAction"
                            [showImagePreview]="showImagePreview"
                            (fileRetry)="retryUpload($event)"
                        ></dominus-uploader-file>
                    </ng-container>
                    <ng-template #noFilesMultiple>
                        <div class="no-files-multiple">
                            <h3>{{ intl[DominusUploaderIntl.MULTIPLE_NO_FILES_MESSAGE] }}</h3>
                            <span *ngIf="allowedExtensions.length" class="allowed-extensions">
                        <span>{{intl[DominusUploaderIntl.ALLOWED_EXTENSIONS]}}</span> {{ allowedExtensions.join(', ') }}
                    </span>
                            <span
                                *ngIf="maxImageSizeText">{{ intl[DominusUploaderIntl.IMAGE_SIZE_CHECK_TEXT] }} {{ maxImageSizeText }}</span>
                        </div>
                    </ng-template>
                </ng-container>

                <ng-container *ngSwitchCase="'file-uploader-single'">
                    <div class="actions">
                        <button mat-mini-fab
                                type="button"
                                color="primary"
                                class="upload-btn"
                                (click)="openFilesInput()">

                            <mat-icon>attach_file</mat-icon>
                        </button>
                    </div>

                    <dominus-uploader-file
                        *ngIf="hasFiles || filesQueue.has(lastFileId);"
                        [fileIndex]="0"
                        [imagePreviewStyles]="imagePreviewStyles"
                        [error]="filesQueue.get(lastFileId)?.error || ''"
                        [uploadProgress]="filesQueue.get(lastFileId)?.progress"
                        [file]="hasFiles ? _value[0] : $any(filesQueue.get(lastFileId))"
                        [progressBarColor]="progressBarColor"
                        (fileDelete)="removeFile($event)"
                        (fileRetry)="retryUpload($event)"
                    ></dominus-uploader-file>
                </ng-container>

                <ng-container *ngSwitchDefault>
                    <div class="actions">
                        <button type="button" mat-mini-fab color="primary" (click)="openFilesInput()">
                            <mat-icon>add</mat-icon>
                        </button>
                    </div>
                    <ng-container *ngIf="hasFiles || filesQueue.has(lastFileId); else noImagePlaceholder">
                        <div class="image-previews">
                            <ng-container *ngIf="multiple || filesQueue.size === 0">
                                <dominus-uploader-image
                                    *ngFor="let file of _value; let i = index"
                                    [fileIndex]="i"
                                    [file]="file"
                                    error=""
                                    [progressBarColor]="progressBarColor"
                                    [imagePreviewStyles]="imagePreviewStyles"
                                    [allowDeleteAction]="allowDeleteAction"
                                    (fileDelete)="removeFile($event)"></dominus-uploader-image>
                            </ng-container>

                            <dominus-uploader-image
                                *ngFor="let queuedFile of filesQueue.entries()"
                                [fileIndex]="queuedFile[0]"
                                [error]="queuedFile[1].error"
                                [uploadProgress]="queuedFile[1].progress"
                                [file]="queuedFile[1]"
                                [progressBarColor]="progressBarColor"
                                [imagePreviewStyles]="imagePreviewStyles"
                                [allowDeleteAction]="allowDeleteAction"
                                (fileRetry)="retryUpload($event)"></dominus-uploader-image>
                        </div>
                    </ng-container>
                </ng-container>

                <ng-template #noImagePlaceholder>
                    <div class="no-files-multiple">
                        <h3>{{ intl[DominusUploaderIntl.NO_IMAGE_MESSAGE] }}</h3>
                        <span *ngIf="allowedExtensions.length" class="allowed-extensions">
                    <span>{{intl[DominusUploaderIntl.ALLOWED_EXTENSIONS]}}</span> {{ allowedExtensions.join(', ') }}
                </span>
                        <span
                            *ngIf="maxImageSizeText">{{ intl[DominusUploaderIntl.IMAGE_SIZE_CHECK_TEXT] }} {{ maxImageSizeText }}</span>
                    </div>
                </ng-template>
            </ng-container>
        </div>
        <input #fileInput type="file" [accept]="allowedExtensions.length ? '.' + allowedExtensions.join(',.') : null"
               [multiple]="multiple" (change)="onFilesAdded($any($event.target).files)">
    `
})
export class FakeUploaderComponent extends DmUploaderComponent {

    override uploadFile(queuedDominusFile: DominusQueuedFile) {
        const speed = 80000;
        const duration = Math.ceil(queuedDominusFile.size / speed);
        let loaded = 0;

        interval(1000).pipe(takeUntil(this.componentDestroyed$), take(duration), finalize(() => {
            if(!this.multiple)
            {
                this._value = [];
            }
            this._value.push({
                name: queuedDominusFile.file.name,
                size: queuedDominusFile.file.size,
                type: queuedDominusFile.file.type,
                imagePreviewUrl: queuedDominusFile.file.type.includes('image') ? URL.createObjectURL(queuedDominusFile.file) : '',
                data: {
                    serverProp1: 'Sent from the server',
                    serverProp2: 'Sent from the server',
                }
            });
            this.filesQueue.delete(queuedDominusFile.id);
            this.hasFiles = true;
            this.changeDetector.markForCheck();
            this._onChange(this.value);
            if(this.isInAngularForm && !this.filesQueue.size)
            {
                this.uploadFinished.next(this.value);
            }
        })).subscribe(() => {
            loaded += speed;
            queuedDominusFile.progress = Math.floor(loaded / queuedDominusFile.size * 100);
            this.changeDetector.markForCheck();
        });

        return new Promise(() => {}) as Promise<void>;
    }

    override removeFile(fileIndex: number) {
        this._value.splice(fileIndex, 1);
        this.hasFiles = this._value.length > 0;
        this.changeDetector.markForCheck();
        this._onChange(this.value);

        return new Promise(() => {}) as Promise<void>;
    }
}
