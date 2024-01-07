import {InjectionToken} from "@angular/core";

export interface DominusFile {
    name: string;
    /**
     * bytes
     */
    size?: number;
    /**
     * A string containing the file's MIME type, or an empty string if the type could not be determined.
     */
    type?: string;
    imagePreviewUrl?: string;
    /**
     * Custom data attached to this file(usually the response body from the server after upload).
     */
    data?: { [key: string]: any };
}

export interface DominusQueuedFile extends DominusFile {
    id: number;
    progress: number;
    error: string;
    file: File;
    canRetryUpload: boolean;
}

export enum DmUploaderIntl {
    NO_FILES_MSG,
    UNKNOWN_ERROR,
    INVALID_EXTENSION,
    MAX_SIZE_EXCEEDED,
    ALLOWED_EXTENSIONS,
    IMAGE_SIZE_CHECK_FAILED,
    IMAGE_SIZE_CHECK_TEXT
}

export const DM_UPLOADER_INTL = new InjectionToken<Record<DmUploaderIntl, string>>('Dominus uploader i18n strings');

export interface DominusImageSize {
    width?: number;
    height?: number;
}
