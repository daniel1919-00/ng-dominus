import {CodeExample} from "../../components/code-example/code-example";

export const dmUploaderCodeExample: CodeExample = {
    html: `
<form [formGroup]="form">
    <h3>Configuration</h3>

    <section formGroupName="config" class="dm:grid">
        <mat-form-field class="dm:col-fixed">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
                <mat-option value="file-uploader">file-uploader</mat-option>
                <mat-option value="image-uploader">image-uploader</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-checkbox color="primary" formControlName="multiple" class="dm:col-fixed">Multiple</mat-checkbox>
    </section>

    <br>
    <h3>Result</h3>
    <mat-form-field class="dm:col-12">
        <mat-label>Uploader</mat-label>
        <dm-uploader
            formControlName="value"
            [multiple]="!!form.get(['config', 'multiple'])?.value"
            [type]="form.get(['config', 'type'])?.value || 'file-uploader'"
            [allowedExtensions]="form.get(['config', 'allowedExtensions'])?.value || ['txt', 'pdf']"
            fileSaveEndpoint="https://localhost/uploader/upload"
            fileDeleteEndpoint="https://localhost/uploader/delete"></dm-uploader>
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
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {DmUploaderComponent} from "../../../../../dm-uploader/src/lib/dm-uploader.component";
import {UploaderDocsComponent} from "./uploader-docs/uploader-docs.component";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmUploaderCodeExample} from "./dm-uploader-code-example";

@Component({
    selector: 'app-dm-uploader-docs',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, ReactiveFormsModule, DmUploaderComponent, UploaderDocsComponent, MatInputModule, MatCheckboxModule, MatSelectModule, ComponentDocHeaderComponent, CodeExampleComponent],
    templateUrl: './dm-uploader-docs.component.html',
    styleUrl: './dm-uploader-docs.component.scss'
})
export class DmUploaderDocsComponent {
    form: UntypedFormGroup;

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [[]],
            config: fb.group({
                multiple: [true],
                type: ['file-uploader'],
                allowedExtensions: [['txt', 'pdf']]
            })
        });
    }
}
    `,
    styles: ``
};
