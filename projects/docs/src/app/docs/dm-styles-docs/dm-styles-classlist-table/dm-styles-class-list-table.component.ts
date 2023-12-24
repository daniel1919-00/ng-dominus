import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {ClassList} from "../dm-styles-code-example";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-dm-styles-class-list-table',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIconModule, MatTooltipModule, MatButtonModule],
    templateUrl: './dm-styles-class-list-table.component.html',
    styleUrl: './dm-styles-class-list-table.component.scss'
})
export class DmStylesClassListTableComponent implements OnInit {
    @Input({required: true}) classes!: ClassList[];
    @Input() filterCategory = '';
    displayedColumns = ['class', 'description', 'properties', 'forceFlagSupport', 'responsiveNamespacesSupport', 'modifiers'];

    ngOnInit() {
        if (this.filterCategory !== '') {
            this.classes = this.classes.filter(item => item.category === this.filterCategory);
        }
    }

    getTooltip(name: string): string {
        switch (name) {
            case 'force-suffix':
                return 'Suffix that when added to the class name, makes all their properties !important. Example: dm:no-padding-f';

            case 'responsive-namespace':
                return 'A namespace that when added to the class name, makes it so that it only becomes active when the responsive namespace is active(the responsive breakpoint is active).';

            case 'modifiers':
                return 'List of classes that when added alongside the main class, modifies its behaviour.';
        }

        return '';
    }

    seeProperties(properties: string) {

    }
}
