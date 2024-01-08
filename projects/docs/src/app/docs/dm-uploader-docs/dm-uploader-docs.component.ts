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

    protected readonly dmUploaderCodeExample = dmUploaderCodeExample;
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
