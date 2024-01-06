import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routes} from "../../app.routes";
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-dm-intro',
    standalone: true,
    imports: [CommonModule, MatCardModule, RouterModule],
    templateUrl: './dm-intro.component.html',
    styleUrl: './dm-intro.component.scss'
})
export class DmIntroComponent {
    protected availableComponents = routes.filter(r => r.data?.componentScreenshot).map(r => { return {title: r.title, link: r.path, image: r.data?.componentScreenshot || ''}});
}
