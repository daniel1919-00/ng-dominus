import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FakeUploaderComponent} from "../dm-uploader-docs/fake-uploader/fake-uploader.component";
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

@Component({
  selector: 'app-dm-tags-docs',
  standalone: true,
    imports: [CommonModule, FakeUploaderComponent, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatTabsModule, ReactiveFormsModule, UploaderDocsComponent, TagsDocsComponent, DmTagsComponent],
  templateUrl: './dm-tags-docs.component.html',
  styleUrl: './dm-tags-docs.component.scss'
})
export class DmTagsDocsComponent {
    form: UntypedFormGroup;

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [[]],
            config: fb.group({

            })
        });
    }
}
