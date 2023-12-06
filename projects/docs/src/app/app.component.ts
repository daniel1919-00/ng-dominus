import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {menuItem} from "./sidenav";
import {routes} from "./app.routes";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidenavMenuItemComponent} from "./components/sidenav-menu-item/sidenav-menu-item.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatSidenavModule, SidenavMenuItemComponent, MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    menuItems: menuItem[] = [];
    sideMenuOpen = true;
    mobileScreenSize = false;

    constructor(
        protected breakpointObserver: BreakpointObserver,
        private changeDetector: ChangeDetectorRef
    ) {
        const menuItems: menuItem[] = [];
        for (let i = routes.length; i--;) {
            const route = routes[i];

            if (!route.data) {
                continue;
            }

            menuItems.push({
                title: route.title,
                path: '/' + route.path,
                icon: route.data['icon'],
                children: []
            });
        }

        menuItems.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }

            if (a.title > b.title) {
                return 1;
            }

            return 0;
        });

        this.menuItems = menuItems;

        breakpointObserver.observe('(max-width: 768px)').subscribe(mobileSize => {
            const mobileScreenSize = mobileSize.matches;
            this.sideMenuOpen = !mobileScreenSize;
            this.mobileScreenSize = mobileScreenSize;
            this.changeDetector.markForCheck();
        });
    }
}
