import {Route} from '@angular/router';
import {menuItemIcon} from "./sidenav";
import {DmIntroComponent} from "./docs/dm-intro/dm-intro.component";

export interface DocRoute extends Route {
    title: string;
    data?: {
        icon: menuItemIcon,
        componentScreenshot?: string;
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
            componentScreenshot: 'table-component.png'
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
            componentScreenshot: 'uploader-component.png'
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
            componentScreenshot: 'tags-component.png'
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
            componentScreenshot: 'dm-styles.png'
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
            componentScreenshot: 'dm-notification.png'
        }
    },

    {
        title: 'Intro',
        path: '**',
        component: DmIntroComponent,
        pathMatch: 'full'
    }
];
