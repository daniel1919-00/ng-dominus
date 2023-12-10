import {InjectionToken} from "@angular/core";
import {AppConfig} from "./interfaces/app-config.interface";

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
