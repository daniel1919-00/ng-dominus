import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_SNACK_BAR_DATA, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";
import {DmNotificationActionButton, DmNotificationConfig} from "../../dm-notifications";
import {MatButtonModule} from "@angular/material/button";

@Component({
    standalone: true,
    imports: [CommonModule, MatSnackBarLabel, MatButtonModule],
    templateUrl: './dm-notification.component.html',
    styleUrl: './dm-notification.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DmNotificationComponent {
    protected readonly textContent: boolean;

    constructor(
        private snackBarRef: MatSnackBarRef<any>,
        @Inject(MAT_SNACK_BAR_DATA) protected data: DmNotificationConfig
    ) {
        this.textContent = typeof data.content === 'string';
    }

    actionBtnClicked(actionBtn: DmNotificationActionButton) {
        setTimeout(actionBtn.click);
        this.snackBarRef.dismissWithAction();
    }
}
