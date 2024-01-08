import {Route} from '@angular/router';
import {menuItemIcon} from "./sidenav";
import {DmIntroComponent} from "./docs/dm-intro/dm-intro.component";

export interface DocRoute extends Route {
    title: string;
    data?: {
        icon: menuItemIcon,
        displayOnMainPage?: boolean;
    }
}

export const routes: DocRoute[] = [
    {
        title: 'Table',
        path: 'dm-table',
        loadComponent: () => import('./docs/dm-table-docs/dm-table-docs.component').then(c => c.DmTableDocsComponent),
        data: {
            icon: {
                src: 'table_chart'
            },
            displayOnMainPage: true
        }
    },
    {
        title: 'Uploader',
        path: 'dm-uploader',
        loadComponent: () => import('./docs/dm-uploader-docs/dm-uploader-docs.component').then(c => c.DmUploaderDocsComponent),
        data: {
            icon: {
                src: 'file_upload'
            },
            displayOnMainPage: true
        }
    },
    {
        title: 'Tags',
        path: 'dm-tags',
        loadComponent: () => import('./docs/dm-tags-docs/dm-tags-docs.component').then(c => c.DmTagsDocsComponent),
        data: {
            icon: {
                src: 'local_offer'
            },
            displayOnMainPage: true
        }
    },
    {
        title: 'CSS library',
        path: 'dm-styles',
        loadComponent: () => import('./docs/dm-styles-docs/dm-styles-docs.component').then(c => c.DmStylesDocsComponent),
        data: {
            icon: {
                src: 'css'
            },
            displayOnMainPage: true
        }
    },
    {
        title: 'Notifications',
        path: 'dm-notifications',
        loadComponent: () => import('./docs/dm-notifications-docs/dm-notifications-docs.component').then(c => c.DmNotificationsDocsComponent),
        data: {
            icon: {
                src: 'campaign'
            },
            displayOnMainPage: true
        }
    },

    {
        title: 'Intro',
        path: '**',
        component: DmIntroComponent,
        pathMatch: 'full'
    }
];
