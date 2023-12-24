import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {DmNotificationConfirmConfig} from "../../dm-notifications";
import {MatButtonModule} from "@angular/material/button";

@Component({
    standalone: true,
    imports: [CommonModule, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogTitle],
    templateUrl: './dm-notifications-confirm.component.html',
    styleUrl: './dm-notifications-confirm.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmNotificationsConfirmComponent {
    constructor(
        protected dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) protected data: DmNotificationConfirmConfig
    ) {
        data.buttonAlignment = data.buttonAlignment || 'end';
        data.acceptBtnText = data.acceptBtnText || 'Confirm';
        data.declineBtnText = data.declineBtnText || 'Decline';
        data.acceptBtnColor = data.acceptBtnColor || 'primary';
    }
}
