import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DmNotificationAlertConfig, DmNotificationConfig, DmNotificationConfirmConfig} from "./dm-notifications";
import {DmNotificationsAlertComponent} from "./components/dm-notifications-alert/dm-notifications-alert.component";
import {map, Observable} from "rxjs";
import {
    DmNotificationsConfirmComponent
} from "./components/dm-notifications-confirm/dm-notifications-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DmNotificationComponent} from "./components/dm-notification/dm-notification.component";

@Injectable({
    providedIn: "root"
})
export class DmNotificationsService {
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    /**
     * Opens an alert dialog
     * @param config
     */
    alert(config: DmNotificationAlertConfig) {
        return this.dialog.open(DmNotificationsAlertComponent, {
            disableClose: config.disableClose !== undefined ? config.disableClose : false,
            data: config
        });
    }

    /**
     * Opens a confirmation dialog.
     * @param {DmNotificationConfirmConfig} config
     * @return An observable with the result of the user confirmation.
     * Possible observable values: true/false - accept/decline | null - the user closed the dialog without accepting or declining (usually by pressing the escape key or clicking the backdrop)
     */
    confirm(config: DmNotificationConfirmConfig): Observable<boolean | null> {
        return this.dialog.open(DmNotificationsConfirmComponent, {
            disableClose: config.disableClose !== undefined ? config.disableClose : false,
            data: config
        }).afterClosed().pipe(map<any, boolean | null>(result => {
            if (result === undefined) {
                return null;
            }

            return result;
        }));
    }

    /**
     * Displays a notification
     * @param {DmNotificationConfig} config
     */
    notify(config: DmNotificationConfig) {
        this.snackBar.openFromComponent(DmNotificationComponent, {
            duration: config.duration === undefined ? 5000 : config.duration,
            verticalPosition: config.position?.vertical || 'bottom',
            horizontalPosition: config.position?.horizontal || 'end',
            panelClass: ['ng-dominus-notification-container', config.type],
            data: config
        });
    }
}
