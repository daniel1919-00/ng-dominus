import {CodeExample} from "../../components/code-example/code-example";

export const dmTagsCodeExample: CodeExample = {
    html: `
<form [formGroup]="form">
    <h3>Configuration</h3>

    <section formGroupName="config" class="dm:grid">
        <mat-form-field class="dm:col-6">
            <mat-label>autocompleteOptions</mat-label>
            <dm-tags formControlName="autocompleteOptions"></dm-tags>
        </mat-form-field>

        <mat-form-field class="dm:col-6">
            <mat-label>addOnKeycodes</mat-label>
            <mat-select [multiple]="true" formControlName="addOnKeycodes">
                <mat-option [value]="ENTER">ENTER</mat-option>
                <mat-option [value]="COMMA">COMMA</mat-option>
                <mat-option [value]="SEMICOLON">SEMICOLON</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-checkbox class="dm:col-6" color="primary" formControlName="addOnBlur">addOnBlur</mat-checkbox>
        <mat-checkbox class="dm:col-6" color="primary" formControlName="allowDuplicates">allowDuplicates
        </mat-checkbox>
    </section>

    <br>
    <h3>Result</h3>
    <mat-form-field>
        <mat-label>Tags</mat-label>
        <dm-tags
            formControlName="value"
            [autocompleteOptions]="form.get('config.autocompleteOptions')?.value"
            [addOnKeycodes]="form.get('config.addOnKeycodes')?.value || [ENTER]"
            [addOnBlur]="form.get('config.addOnBlur')?.value"
            [allowDuplicates]="form.get('config.allowDuplicates')?.value"
        ></dm-tags>
    </mat-form-field>
</form>
<br><br>
<h3>Form Value</h3>
<pre>{{ form.get('value')?.value | json }}</pre>
    `,
    ts: `
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {UploaderDocsComponent} from "../dm-uploader-docs/uploader-docs/uploader-docs.component";
import {TagsDocsComponent} from "./tags-docs/tags-docs.component";
import {DmTagsComponent} from "../../../../../dm-tags/src/lib/dm-tags.component";
import {COMMA, ENTER, SEMICOLON} from "@angular/cdk/keycodes";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmTagsCodeExample} from "./dm-tags-code-example";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";

@Component({
    selector: 'app-dm-tags-docs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatTabsModule,
        ReactiveFormsModule,
        UploaderDocsComponent,
        TagsDocsComponent,
        DmTagsComponent,
        CodeExampleComponent,
        ComponentDocHeaderComponent
    ],
    templateUrl: './dm-tags-docs.component.html',
    styleUrl: './dm-tags-docs.component.scss'
})
export class DmTagsDocsComponent {
    form: UntypedFormGroup;

    protected readonly ENTER = ENTER;
    protected readonly COMMA = COMMA;
    protected readonly SEMICOLON = SEMICOLON;

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [null],
            config: fb.group({
                autocompleteOptions: [null],
                addOnKeycodes: [[ENTER]],
                addOnBlur: [true],
                allowDuplicates: [true],
            })
        });
    }
}
    `,
    styles: ``
};
