import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'dm-table',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <p>
            dm-table works!
        </p>
        <mat-card>XXX</mat-card>
    `,
    styles: ``
})
export class DmTableComponent {

}
