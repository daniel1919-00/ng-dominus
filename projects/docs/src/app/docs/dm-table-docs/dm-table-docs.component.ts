import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DmTableComponent} from "../../../../../dm-table/src/lib/dm-table.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmTableDocsCodeExample} from "./dm-table-docs-code-example";

@Component({
    selector: 'app-dm-table-docs',
    standalone: true,
    imports: [CommonModule, DmTableComponent, MatCardModule, ComponentDocHeaderComponent, MatTabsModule, CodeExampleComponent, ReactiveFormsModule],
    templateUrl: './dm-table-docs.component.html',
    styleUrl: './dm-table-docs.component.scss'
})
export class DmTableDocsComponent {
    protected readonly dmTagsCodeExample = dmTableDocsCodeExample;
    form: UntypedFormGroup;

    constructor(
        fb: UntypedFormBuilder
    ) {
        this.form = fb.group({
            config: fb.group({})
        });
    }
}
