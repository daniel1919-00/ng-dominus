import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentDocsComponent} from "../../../components/component-docs/component-docs.component";
import {
    ComponentDocsSectionComponent
} from "../../../components/component-docs/components/component-docs-section/component-docs-section.component";
import {
    ComponentDocsSectionItemComponent
} from "../../../components/component-docs/components/component-docs-section-item/component-docs-section-item.component";
import {
    ComponentDocsCodeComponent
} from "../../../components/component-docs/components/component-docs-code/component-docs-code.component";

@Component({
    selector: 'app-uploader-docs',
    standalone: true,
    imports: [CommonModule, ComponentDocsComponent, ComponentDocsSectionComponent, ComponentDocsSectionItemComponent, ComponentDocsCodeComponent],
    templateUrl: './uploader-docs.component.html',
    styleUrls: ['./uploader-docs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderDocsComponent {

}
