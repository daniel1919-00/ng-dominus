import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {DmNotificationAlertConfig} from "../../dm-notifications";
import {MatButtonModule} from "@angular/material/button";

@Component({
    standalone: true,
    imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule],
    templateUrl: './dm-notifications-alert.component.html',
    styleUrl: './dm-notifications-alert.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmNotificationsAlertComponent {
    constructor(
        protected dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) protected data: DmNotificationAlertConfig
    ) {
        data.buttonAlignment = data.buttonAlignment || 'end';
        data.closeButtonText = data.closeButtonText || 'OK';
        data.closeButtonColor = data.closeButtonColor || 'primary';
    }
}
