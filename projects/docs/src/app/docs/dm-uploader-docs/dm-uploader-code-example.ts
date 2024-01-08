import {CodeExample} from "../../components/code-example/code-example";

export const dmUploaderCodeExample: CodeExample = {
    html: `
<form [formGroup]="form">
    <h3>Configuration</h3>
    <section formGroupName="config" class="dm:grid">
        <mat-form-field class="dm:col-12">
            <mat-label>[allowedExtensions]</mat-label>
            <dm-tags formControlName="allowedExtensions"></dm-tags>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[label]</mat-label>
            <input type="text" matInput formControlName="label">
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[displayAs]</mat-label>
            <mat-select formControlName="displayAs">
                <mat-option value="list">list</mat-option>
                <mat-option value="grid">grid</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[multiple]</mat-label>
            <mat-select formControlName="multiple">
                <mat-option value="1">true</mat-option>
                <mat-option value="0">false</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[maxFileSize]</mat-label>
            <input type="number" matInput formControlName="maxFileSize">
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[showImagePreview]</mat-label>
            <mat-select formControlName="showImagePreview">
                <mat-option value="1">true</mat-option>
                <mat-option value="0">false</mat-option>
            </mat-select>
        </mat-form-field>
    </section>
    <br>
    <h3>Result</h3>
    <h5>Uploader with mat-form-field</h5>
    <mat-form-field class="dm:col-12">
        <mat-label>{{ form.get(['config', 'label'])?.value || '' }}</mat-label>
        <dm-uploader
            formControlName="value"
            [multiple]="form.get(['config', 'multiple'])?.value === '1'"
            [maxFileSize]="(form.get(['config', 'maxFileSize'])?.value || 5) * 1025 * 1024"
            [displayAs]="form.get(['config', 'displayAs'])?.value || 'list'"
            [allowedExtensions]="allowedExtensions"
            [maxImageSize]="maxImageSize"
            [showImagePreview]="form.get(['config', 'showImagePreview'])?.value === '1'"
            fileSaveEndpoint="https://localhost/uploader/upload"
            fileDeleteEndpoint="https://localhost/uploader/delete"></dm-uploader>
    </mat-form-field>
    <br>
    <h5>Uploader without mat-form-field</h5>
    <dm-uploader
        formControlName="value"
        [multiple]="form.get(['config', 'multiple'])?.value === '1'"
        [maxFileSize]="(form.get(['config', 'maxFileSize'])?.value || 5) * 1025 * 1024"
        [displayAs]="form.get(['config', 'displayAs'])?.value || 'list'"
        [label]="form.get(['config', 'label'])?.value || ''"
        [allowedExtensions]="allowedExtensions"
        [maxImageSize]="maxImageSize"
        [showImagePreview]="form.get(['config', 'showImagePreview'])?.value === '1'"
        fileSaveEndpoint="https://localhost/uploader/upload"
        fileDeleteEndpoint="https://localhost/uploader/delete"></dm-uploader>
</form>
<br><br>
<h3>Form Value</h3>
<pre>{{ form.get('value')?.value | json }}</pre>
    `,
    ts: `
import {Component, OnDestroy} from '@angular/core';
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
import {DmTagsComponent} from "../../../../../dm-tags/src/lib/dm-tags.component";
import {Subject, takeUntil} from "rxjs";
import {DominusImageSize} from "../../../../../dm-uploader/src/lib/dm-uploader";

@Component({
    selector: 'app-dm-uploader-docs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        ReactiveFormsModule,
        DmUploaderComponent,
        UploaderDocsComponent,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        ComponentDocHeaderComponent,
        CodeExampleComponent,
        DmTagsComponent
    ],
    templateUrl: './dm-uploader-docs.component.html',
    styleUrl: './dm-uploader-docs.component.scss'
})
export class DmUploaderDocsComponent implements OnDestroy{
    form: UntypedFormGroup;

    protected allowedExtensions: string[] = ['txt', 'pdf', 'docx', 'xlsx', 'png', 'gif', 'jpg'];
    protected maxImageSize: DominusImageSize[] = [{width: 500, height: 500}];

    private readonly componentDestroyed$ = new Subject<void>();

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [[]],
            config: fb.group({
                multiple: ['1'],
                displayAs: ['list'],
                allowedExtensions: [['txt', 'pdf', 'docx', 'xlsx', 'png', 'gif', 'jpg']],
                maxFileSize: [5],
                showImagePreview: ['1'],
                label: ['Uploader preview']
            })
        });

        this.form.get(['config', 'allowedExtensions'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(value => {
                this.allowedExtensions = value.slice();
            });

        this.form.get(['config', 'type'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(value => {
                if(value === 'image-uploader') {
                    this.form.get(['config', 'allowedExtensions'])?.setValue(['png', 'gif', 'jpg', 'jpeg']);
                } else {
                    this.form.get(['config', 'allowedExtensions'])?.setValue(['txt', 'pdf', 'docx', 'xlsx']);
                }
            });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
    `,
    styles: ``
};
