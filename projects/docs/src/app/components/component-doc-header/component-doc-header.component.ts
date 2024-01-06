import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-component-doc-header',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule],
    templateUrl: './component-doc-header.component.html',
    styleUrl: './component-doc-header.component.scss'
})
export class ComponentDocHeaderComponent {
    @Input({required: true}) title!: string;
    @Input() titleLink: string|null = null;
}
