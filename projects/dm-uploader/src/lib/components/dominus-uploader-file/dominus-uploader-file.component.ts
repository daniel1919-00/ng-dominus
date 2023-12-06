import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DominusFile, DominusQueuedFile} from "../../dm-uploader";
import {ThemePalette} from "@angular/material/core";

@Component({
    selector: 'dominus-uploader-file',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
    templateUrl: './dominus-uploader-file.component.html',
    styleUrls: ['./dominus-uploader-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DominusUploaderFileComponent {
    @Input() fileIndex!: number;
    @Input() file!: DominusFile | DominusQueuedFile;
    @Input() imagePreviewStyles!: { [style: string]: string };
    @Input() error: string | undefined;
    @Input() uploadProgress: number | undefined;
    @Input() progressBarColor: ThemePalette = 'primary';
    @Input() allowDeleteAction?: boolean;
    @Input() showImagePreview?: boolean;

    @Output() fileDelete = new EventEmitter<number>();
    @Output() fileRetry = new EventEmitter<number>();
}
