import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeExample} from "./code-example";

@Component({
    selector: 'app-code-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './code-example.component.html',
    styleUrl: './code-example.component.scss'
})
export class CodeExampleComponent {
    @Input() title = '';
    @Input({required: true}) code!: CodeExample;
}
