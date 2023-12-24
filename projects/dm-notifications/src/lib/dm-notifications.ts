import {ThemePalette} from "@angular/material/core";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ComponentType} from "@angular/cdk/overlay";

export interface DmNotificationAlertConfig {
    /**
     * Dialog content
     */
    content: string;
    /**
     * Dialog title
     */
    title?: string;
    /**
     * Classes applied to the dialog title.
     * The value must be compatible with [ngClass]
     */
    titleClass?: string | string[] | Set<string> | {
        [className: string]: any;
    };
    /**
     * Alignment of the close button. Defaults to: end
     */
    buttonAlignment?: "start" | "center" | "end" | undefined;
    closeButtonText?: string;
    closeButtonColor?: ThemePalette;

    /**
     * Disables closing the modal with the escape key or by clicking on the backdrop
     */
    disableClose?: boolean;
}

export interface DmNotificationConfirmConfig {
    /**
     * Dialog content
     */
    content: string;

    /**
     * Dialog title
     */
    title?: string;

    /**
     * Classes applied to the dialog title.
     * The value must be compatible with [ngClass]
     */
    titleClass?: string | string[] | Set<string> | {
        [className: string]: any;
    };

    /**
     * Accept button text
     */
    acceptBtnText?: string;

    /**
     * Accept button color
     */
    acceptBtnColor?: ThemePalette;

    /**
     * Decline button text
     */
    declineBtnText?: string;

    /**
     * Decline button color
     */
    declineBtnColor?: ThemePalette;

    /**
     * Alignment of the buttons. Defaults to: end
     */
    buttonAlignment?: "start" | "center" | "end" | undefined;

    /**
     * Disables closing the modal with the escape key or by clicking on the backdrop
     */
    disableClose?: boolean;
}

export type DmNotificationType = 'info' | 'success' | 'warn' | 'danger';

export interface DmNotificationActionButton {
    label: string;
    click: () => void;
}

export interface DmNotificationConfig {
    type: DmNotificationType;
    content: string | ComponentType<any>;
    /**
     * duration in milliseconds.
     * Note: 0 will keep the notification open indefinitely
     */
    duration?: number;
    position?: {
        horizontal?: MatSnackBarHorizontalPosition,
        vertical?: MatSnackBarVerticalPosition
    };

    actionButtons?: DmNotificationActionButton[];
}
