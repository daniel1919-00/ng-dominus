import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";

@Component({
  selector: 'app-dm-styles-docs',
  standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, ComponentDocHeaderComponent],
  templateUrl: './dm-styles-docs.component.html',
  styleUrl: './dm-styles-docs.component.scss'
})
export class DmStylesDocsComponent {

}
