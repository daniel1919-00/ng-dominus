import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {classList, dmStylesFlexExample} from "./dm-styles-code-example";
import {MatListModule} from "@angular/material/list";
import {DmStylesClassListTableComponent} from "./dm-styles-classlist-table/dm-styles-class-list-table.component";

@Component({
    selector: 'app-dm-styles-docs',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, ComponentDocHeaderComponent, CodeExampleComponent, MatListModule, DmStylesClassListTableComponent],
    templateUrl: './dm-styles-docs.component.html',
    styleUrl: './dm-styles-docs.component.scss'
})
export class DmStylesDocsComponent {

    protected readonly dmStylesFlexExample = dmStylesFlexExample;
    protected readonly classList = classList;
}
