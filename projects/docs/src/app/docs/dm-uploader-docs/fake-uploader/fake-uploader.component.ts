import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
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
    templateUrl: '../../../../../../dm-uploader/src/lib/dm-uploader.component.html',
    styleUrl: '../../../../../../dm-uploader/src/lib/dm-uploader.component.scss'
})
export class FakeUploaderComponent extends DmUploaderComponent {

    override uploadFile(queuedDominusFile: DominusQueuedFile) {
        const speed = 80000;
        const duration = Math.ceil(queuedDominusFile.size / speed);
        let loaded = 0;

        interval(1000).pipe(takeUntil(this.componentDestroyed$), take(duration), finalize(() => {
            if (!this.multiple) {
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
            this.onChange(this.value);
            this.stateChanges.next();
            if (this.isInAngularForm && !this.filesQueue.size) {
                this.uploadFinished.next(this.value);
            }
        })).subscribe(() => {
            loaded += speed;
            queuedDominusFile.progress = Math.floor(loaded / queuedDominusFile.size * 100);
            this.changeDetector.markForCheck();
        });

        return new Promise(() => {
        }) as Promise<void>;
    }

    override removeFile(fileIndex: number) {
        this._value.splice(fileIndex, 1);
        this.hasFiles = this._value.length > 0;
        this.changeDetector.markForCheck();
        this.onChange(this.value);
        this.stateChanges.next();

        return new Promise(() => {
        }) as Promise<void>;
    }
}
