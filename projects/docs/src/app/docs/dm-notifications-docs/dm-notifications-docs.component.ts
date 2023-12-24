import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {dmNotificationsCodeExample} from "./dm-notifications-code-example";
import {DmNotificationsService} from "../../../../../dm-notifications/src/lib/dm-notifications.service";
import {MatButtonModule} from "@angular/material/button";
import {BehaviorSubject} from "rxjs";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DmNotificationConfig} from "../../../../../dm-notifications/src/lib/dm-notifications";
import {DmNotificationsApiDocsComponent} from "./dm-notifications-api-docs/dm-notifications-api-docs.component";

@Component({
    standalone: true,
    template: `
        <p>Hello from example component!</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="" style="max-width: 180px">
    `
})
class DmNotificationsExampleComponent {}

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule, CodeExampleComponent, ComponentDocHeaderComponent, FormsModule, MatCardModule, MatTabsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, DmNotificationsApiDocsComponent],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    protected readonly dmNotificationsCodeExample = dmNotificationsCodeExample;
    protected readonly confirmResult$ = new BehaviorSubject<boolean|null>(null);
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

    alert() {
        this.notifications.alert({
            title: 'Alert dialog example',
            content: 'This is an example alert!'
        });
    }

    confirm() {
        this.notifications.confirm({
            title: 'Confirmation dialog example',
            content: 'Are you sure?'
        }).subscribe(result => this.confirmResult$.next(result));
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
