import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-component-doc-header',
  standalone: true,
    imports: [CommonModule, MatCardModule],
  templateUrl: './component-doc-header.component.html',
  styleUrl: './component-doc-header.component.scss'
})
export class ComponentDocHeaderComponent {
    @Input({required: true}) title!: string;
}
