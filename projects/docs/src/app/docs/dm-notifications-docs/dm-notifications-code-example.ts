import {CodeExample} from "../../components/code-example/code-example";

export const dmNotificationsAlertDialogCodeExample: CodeExample = {
    html: `
<div class="dm:grid">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="alert()">Show alert</button>
</div>
    `,
    ts: `
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    constructor(
        protected notifications: DmNotificationsService
    ) {}

    alert() {
        this.notifications.alert({
            title: 'Alert dialog example',
            content: 'This is an example alert!'
        });
    }
}
    `,
    styles: ``
};

export const dmNotificationsConfirmDialogCodeExample: CodeExample = {
    html: `
<div class="dm:grid">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="confirm()">Show confirmation dialog</button>
</div>
<br>
<h3>Result</h3>
<pre>Confirmed: {{ confirmResult$ | async | json }}</pre>
    `,
    ts: `
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    protected readonly confirmResult$ = new BehaviorSubject<boolean|null>(null);

    constructor(
        protected notifications: DmNotificationsService
    ) {}

    confirm() {
        this.notifications.confirm({
            title: 'Confirmation dialog example',
            content: 'Are you sure?'
        }).subscribe(result => this.confirmResult$.next(result));
    }
}
    `,
    styles: ``
};

export const dmGeneralNotificationsCodeExample: CodeExample = {
    html: `
<h3>Configuration</h3>
<form class="dm:grid" [formGroup]="notificationConfig">
    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Duration(ms)</mat-label>
        <input type="number" matInput formControlName="duration">
    </mat-form-field>
    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Notification Type</mat-label>
        <mat-select formControlName="type">
            <mat-option value="info">info</mat-option>
            <mat-option value="success">success</mat-option>
            <mat-option value="warn">warn</mat-option>
            <mat-option value="danger">danger</mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Vertical Position</mat-label>
        <mat-select formControlName="verticalPosition">
            <mat-option value="top">top</mat-option>
            <mat-option value="bottom">bottom</mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Horizontal Position</mat-label>
        <mat-select formControlName="horizontalPosition">
            <mat-option value="start">start</mat-option>
            <mat-option value="center">center</mat-option>
            <mat-option value="end">end</mat-option>
            <mat-option value="left">left</mat-option>
            <mat-option value="right">right</mat-option>
        </mat-select>
    </mat-form-field>
</form>
<h3>Result</h3>
<div class="example-buttons dm:align-content-center">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="exampleNotification()">Show notification</button>
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="notifyUsingComponent()">Show notification using custom component</button>
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="notifyWithCustomButton()">Show notification with an action button</button>
</div>
    `,
    ts: `
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
    standalone: true,
    template: \`
        <p>Hello from example component!</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="" style="max-width: 180px">
    \`
})
class DmNotificationsExampleComponent {}

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    protected notificationConfig: UntypedFormGroup

    constructor(
        fb: UntypedFormBuilder,
        protected notifications: DmNotificationsService
    ) {
        this.notificationConfig = fb.group({
            duration: [5000],
            type: ['info'],
            verticalPosition: ['bottom'],
            horizontalPosition: ['end'],
        });
    }

    exampleNotification() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: 'Example notification'
        });
    }

    notifyUsingComponent() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: DmNotificationsExampleComponent
        });
    }

    notifyWithCustomButton() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: 'This notifications has custom action buttons.',
            actionButtons: [
                {
                    label: 'Action!',
                    click: () => {
                        this.notifications.alert({
                            content: 'Action button clicked!'
                        });
                    }
                }
            ]
        })
    }

    private notify(config: DmNotificationConfig) {
        const duration = parseInt(this.notificationConfig.get('duration')?.value || 0);
        this.notifications.notify(Object.assign({
            duration: isNaN(duration) ? 5000 : duration,
            position: {
                vertical: this.notificationConfig.get('verticalPosition')?.value || 'bottom',
                horizontal: this.notificationConfig.get('horizontalPosition')?.value || 'end',
            }
        }, config || {}));
    }
}
    `,
    styles: ``
};
