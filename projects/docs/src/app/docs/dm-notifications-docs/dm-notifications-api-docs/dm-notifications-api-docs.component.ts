import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentDocsComponent} from "../../../components/component-docs/component-docs.component";
import {
    ComponentDocsSectionComponent
} from "../../../components/component-docs/components/component-docs-section/component-docs-section.component";
import {
    ComponentDocsSectionItemComponent
} from "../../../components/component-docs/components/component-docs-section-item/component-docs-section-item.component";

@Component({
  selector: 'app-dm-notifications-api-docs',
  standalone: true,
    imports: [CommonModule, ComponentDocsComponent, ComponentDocsSectionComponent, ComponentDocsSectionItemComponent],
  templateUrl: './dm-notifications-api-docs.component.html',
  styleUrl: './dm-notifications-api-docs.component.scss'
})
export class DmNotificationsApiDocsComponent {

}
