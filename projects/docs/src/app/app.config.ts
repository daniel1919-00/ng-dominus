import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HIGHLIGHT_OPTIONS} from "ngx-highlightjs";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
                languages: {
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    css: () => import('highlight.js/lib/languages/css'),
                    xml: () => import('highlight.js/lib/languages/xml')
                },
                themePath: 'path-to-theme.css' // Optional, and useful if you want to change the theme dynamically
            }
        }
    ]
};
