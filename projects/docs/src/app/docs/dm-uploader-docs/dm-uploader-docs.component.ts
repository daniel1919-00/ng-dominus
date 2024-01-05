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

@Component({
    selector: 'app-dm-uploader-docs',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, ReactiveFormsModule, DmUploaderComponent, UploaderDocsComponent, MatInputModule, MatCheckboxModule, MatSelectModule, ComponentDocHeaderComponent],
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
