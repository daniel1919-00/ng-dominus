import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeExample, CodeTab} from "./code-example";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {HighlightModule} from "ngx-highlightjs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DmNotificationsService} from "../../../../../dm-notifications/src/lib/dm-notifications.service";

@Component({
    selector: 'app-code-example',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        HighlightModule,
        MatTooltipModule
    ],
    templateUrl: './code-example.component.html',
    styleUrl: './code-example.component.scss'
})
export class CodeExampleComponent {
    @Input({required: true}) code!: CodeExample;
    @Input() title = 'Basic Example';
    protected showSource = false;
    protected currentOpenTab = CodeTab.HTML

    private clipboard: Clipboard;

    constructor(
        private notifications: DmNotificationsService
    ) {
        this.clipboard = navigator.clipboard;
    }

    getCopyBtnTooltip() {
        switch (this.currentOpenTab) {
            case CodeTab.HTML: return 'Copy Html code';
            case CodeTab.TS: return 'Copy Typescript code';
            case CodeTab.STYLES: return 'Copy styles';
        }
    }

    async copyCode() {
        let code = '';
        switch (this.currentOpenTab) {
            case CodeTab.HTML:
                code = this.code.html;
                break;

            case CodeTab.TS:
                code = this.code.ts;
                break;

            case CodeTab.STYLES:
                code = this.code.styles;
                break;

        }

        await this.clipboard.writeText(code);
        this.notifications.notify({
            type: "info",
            content: 'Source code copied to clipboard.'
        });
    }
}
