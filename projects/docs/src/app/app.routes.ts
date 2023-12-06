import {Route} from '@angular/router';
import {menuItemIcon} from "./sidenav";
import {DmIntroComponent} from "./docs/dm-intro/dm-intro.component";

export interface DocRoute extends Route {
    title: string;
    data?: {
        icon: menuItemIcon
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
            }
        }
    },
    {
        title: 'Uploader',
        path: 'dm-uploader',
        loadComponent: () => import('./docs/dm-uploader-docs/dm-uploader-docs.component').then(c => c.DmUploaderDocsComponent),
        data: {
            icon: {
                src: 'file_upload'
            }
        }
    },
    {
        title: 'Tags',
        path: 'dm-tags',
        loadComponent: () => import('./docs/dm-tags-docs/dm-tags-docs.component').then(c => c.DmTagsDocsComponent),
        data: {
            icon: {
                src: 'local_offer'
            }
        }
    },
    {
        title: 'Intro',
        path: '**',
        component: DmIntroComponent,
        pathMatch: 'full'
    }
];
