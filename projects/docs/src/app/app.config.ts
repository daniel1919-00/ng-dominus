import {ApplicationConfig, Inject, Injectable} from '@angular/core';
import {provideRouter, RouterStateSnapshot, TitleStrategy} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HIGHLIGHT_OPTIONS} from "ngx-highlightjs";
import {MAT_TABS_CONFIG} from "@angular/material/tabs";
import {APP_CONFIG} from "./injection-tokens";
import {Title} from "@angular/platform-browser";
import {AppConfig} from "./interfaces/app-config.interface";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BackendInterceptor} from "./backend.interceptor";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@Injectable({providedIn: 'root'})
export class AppTitleStrategy extends TitleStrategy {
    constructor(
        private readonly title: Title,
        @Inject(APP_CONFIG) private appConfig: AppConfig
    ) {
        super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`${this.appConfig.baseTitle} - ${title}`);
        }
    }
}

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendInterceptor,
            multi: true
        },
        {
            provide: APP_CONFIG,
            useValue: {
                baseTitle: 'Dominus material components'
            }
        },
        provideRouter(routes),
        {provide: TitleStrategy, useClass: AppTitleStrategy},
        provideAnimations(),
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    css: () => import('highlight.js/lib/languages/css'),
                    scss: () => import('highlight.js/lib/languages/scss'),
                    xml: () => import('highlight.js/lib/languages/xml')
                },
                themePath: 'assets/highlightjs/xcode.css' // Optional, and useful if you want to change the theme dynamically
            }
        },
        {
            provide: MAT_TABS_CONFIG,
            useValue: {
                animationDuration: '0'
            }
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline'
            }
        }
    ]
};
