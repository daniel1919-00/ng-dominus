import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DmTableComponent} from "../../../../../dm-table/src/lib/dm-table.component";

@Component({
    selector: 'app-dm-table-docs',
    standalone: true,
    imports: [CommonModule, DmTableComponent],
    templateUrl: './dm-table-docs.component.html',
    styleUrl: './dm-table-docs.component.scss'
})
export class DmTableDocsComponent {

}
