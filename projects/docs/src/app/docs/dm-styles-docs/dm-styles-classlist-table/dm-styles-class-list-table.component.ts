import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {ClassList} from "../dm-styles-code-example";

@Component({
    selector: 'app-dm-styles-class-list-table',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './dm-styles-class-list-table.component.html',
    styleUrl: './dm-styles-class-list-table.component.scss'
})
export class DmStylesClassListTableComponent implements OnInit {
    @Input({required: true}) classes!: ClassList[];
    @Input() filterCategory = '';
    displayedColumns = ['class', 'properties', 'forceFlagSupport'];

    ngOnInit() {
        if(this.filterCategory !== '') {
            this.classes = this.classes.filter(item => item.category === this.filterCategory);
        }
    }
}
