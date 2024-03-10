import {CodeExample} from "../../components/code-example/code-example";

export const dmTableDocsCodeExample: CodeExample = {
    html: `
<form [formGroup]="form">
    <h3>Configuration</h3>

    <section formGroupName="config" class="dm:grid dm:align-items-center">
        <mat-form-field class="dm:col-fixed">
            <mat-label>Visible columns</mat-label>
            <mat-select formControlName="tableColumns" [multiple]="true">
                <mat-option *ngFor="let column of tableColumns" [value]="column.id">{{ column.name }}</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field class="dm:col-fixed">
            <mat-label>[dataSource]</mat-label>
            <mat-select formControlName="dataSource">
                <mat-option value="static">Static</mat-option>
                <mat-option value="server">Server</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[sortingArrowPosition]</mat-label>
            <mat-select formControlName="sortingArrowPosition">
                <mat-option value="before">before</mat-option>
                <mat-option value="after">after</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[rowContextMenu]</mat-label>
            <mat-select formControlName="rowContextMenu">
                <mat-option value="1">Enabled</mat-option>
                <mat-option value="0">Disabled</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field *ngIf="form.get(['config', 'rowContextMenu'])?.value === '1'" class="dm:col-fixed">
            <mat-label>[rowContextMenuIsVisibleFn]</mat-label>
            <mat-select formControlName="rowContextMenuIsVisibleFn">
                <mat-option value="all">All rows</mat-option>
                <mat-option value="even">Even rows</mat-option>
                <mat-option value="odd">Odd rows</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[rowHoverEffectEnabled]</mat-label>
            <mat-select formControlName="rowHoverEffectEnabled">
                <mat-option value="1">Enabled</mat-option>
                <mat-option value="0">Disabled</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[rowSelectionModel]</mat-label>
            <mat-select formControlName="rowSelectionModel">
                <mat-option value="1">Enabled</mat-option>
                <mat-option value="0">Disabled</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field *ngIf="form.get(['config', 'rowSelectionModel'])?.value === '1'" class="dm:col-fixed">
            <mat-label>[rowSelectionModel] multiple/single</mat-label>
            <mat-select formControlName="rowSelectionModelMultiple">
                <mat-option value="1">Multiple</mat-option>
                <mat-option value="0">Single</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>Bind to (rowClicked) event</mat-label>
            <mat-select formControlName="rowClicked">
                <mat-option value="1">Bound</mat-option>
                <mat-option value="0">Unbound</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[freezeHeaderRow]</mat-label>
            <mat-select formControlName="freezeHeaderRow">
                <mat-option value="1">Frozen</mat-option>
                <mat-option value="0">Unfrozen</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[maxHeight]</mat-label>
            <input type="text" matInput formControlName="maxHeight">
        </mat-form-field>

        <mat-slide-toggle class="dm:col-fixed" formControlName="isLoading" color="primary">[isLoading]</mat-slide-toggle>
    </section>

    <br>
    <div *ngIf="form.get(['config', 'rowSelectionModel'])?.value === '1'" style="max-height: 200px; overflow: auto;">
        <pre>SelectionModel: {{rowSelectionModel.selected | json}}</pre>
    </div>

    <br>
    <div *ngIf="form.get(['config', 'rowClicked'])?.value === '1'">
        <pre>Clicked row data: {{clickedRowData | json}}</pre>
    </div>

    <br>
    <h3>Result</h3>
    <dm-table
        #table
        [dataSource]="form.get(['config', 'dataSource'])?.value === 'static' ? tableStaticDataSrc : (form.get(['config', 'dataSource'])?.value === 'server' ? tableServerSideDataSrc : [])"
        [columns]="tableColumns"
        [sortingArrowPosition]="form.get(['config', 'sortingArrowPosition'])?.value || 'after'"
        [rowContextMenu]="rowContextMenu"
        [rowContextMenuIsVisibleFn]="rowContextMenuIsVisibleFn"
        [rowHoverEffectEnabled]="form.get(['config', 'rowHoverEffectEnabled'])?.value === '1'"
        [outline]="form.get(['config', 'outline'])?.value === '1'"
        [stripedRows]="form.get(['config', 'stripedRows'])?.value === '1'"
        [freezeHeaderRow]="form.get(['config', 'freezeHeaderRow'])?.value === '1'"
        [maxHeight]="form.get(['config', 'maxHeight'])?.value"
        [rowSelectionModel]="form.get(['config', 'rowSelectionModel'])?.value === '1' ? rowSelectionModel : undefined"
        [pageSize]="10"
    ></dm-table>

    <mat-menu #rowContextMenu="matMenu">
        <button mat-menu-item>Item 1</button>
        <button mat-menu-item>Item 2</button>
    </mat-menu>
</form>
    `,
    ts: `
import {Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DmTableComponent} from "../../../../../dm-table/src/lib/dm-table.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmTableDocsCodeExample} from "./dm-table-docs-code-example";
import {
    DM_TABLE_RENDER_COMPONENT_DATA,
    DmTableColumnDefinition, DmTableColumnVisibility, DmTableRenderComponentData,
} from "../../../../../dm-table/src/lib/dm-table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {TableDocsComponent} from "./table-docs/table-docs.component";
import {MatMenuModule} from "@angular/material/menu";
import {Subject, Subscription, takeUntil} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
    standalone: true,
    template: \`
        Rendering image id <strong>{{ columnData.columnData }}</strong> from <a href="https://picsum.photos/images">Lorem Picsum</a>.
        <br>
        <img [src]="'https://picsum.photos/id/'+columnData.columnData+'/100'" style="max-width: 100px">
    \`
})
class MyColumnRenderer {
    constructor(
        @Inject(DM_TABLE_RENDER_COMPONENT_DATA) protected columnData: DmTableRenderComponentData
    ) {
    }
}

@Component({
    selector: 'app-dm-table-docs',
    standalone: true,
    imports: [
        CommonModule,
        DmTableComponent,
        MatCardModule,
        ComponentDocHeaderComponent,
        MatTabsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        TableDocsComponent,
        MatMenuModule,
        MatSlideToggleModule
    ],
    providers: [
        DatePipe,
        {
            provide: DM_TABLE_INTL,
            useValue: {
                [DmTableIntl.NO_DATA]: 'Nothing here..',
                [DmTableIntl.LOADING]: 'Loading some data...'
            }
        }
    ],
    templateUrl: './dm-table-docs.component.html',
    styleUrl: './dm-table-docs.component.scss',
})
export class DmTableDocsComponent implements OnDestroy {
    form: UntypedFormGroup;
    tableColumns: DmTableColumnDefinition[] = [
        {id: 'column1', name: 'Column 1'},
        {id: 'column2', name: 'Column 2'},
        {id: 'column3', name: 'pipe rendered column', renderUsing: {pipe: DatePipe}},
        {id: 'column4', name: 'component rendered column', renderUsing: {component: MyColumnRenderer}},
    ];

    tableStaticDataSrc: {[key: string]: any}[] = [];

    tableServerSideDataSrc = 'https://localhost/table';
    rowContextMenuIsVisibleFn = (row: any) => {
        if(this.form.get(['config', 'rowContextMenu'])?.value !== '1') {
            return false;
        }

        const displayCond = this.form.get(['config', 'rowContextMenuIsVisibleFn'])?.value;
        if(displayCond === 'all') {
            return true;
        }

        return displayCond === 'even' ? row['column1'] % 2 === 0 : row['column1'] % 2 !== 0;
    }

    rowSelectionModel = new SelectionModel<any>();
    clickedRowData: any = null;

    @ViewChild('table') private table!: DmTableComponent;
    private componentDestroyed$ = new Subject<void>();
    private rowClickedSub?: Subscription;


    constructor(
        fb: UntypedFormBuilder
    ) {
        this.form = fb.group({
            config: fb.group({
                tableColumns: [this.tableColumns.map(c => c.id)],
                dataSource: ['static'],
                sortingArrowPosition: ['after'],
                rowContextMenu: ['0'],
                rowContextMenuIsVisibleFn: ['all'],
                rowHoverEffectEnabled: ['0'],
                rowSelectionModel: ['0'],
                rowSelectionModelMultiple: ['0'],
                rowClicked: ['0'],
                isLoading: [false],
                freezeHeaderRow: ['1'],
                maxHeight: ['700px']
            })
        });

        const date = new Date();
        for(let i = 0; i < 100; ++i) {
            date.setDate(date.getDate() + 1);
            this.tableStaticDataSrc.push({
                column1: i + 1,
                column2: i + 2,
                column3: date.toUTCString(),
                column4: i + 4,
            });
        }

        [
            'rowContextMenu',
            'rowContextMenuIsVisibleFn',
        ].forEach(formControl => this.form.get(['config', formControl])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(() => this.table.refresh(false)));

        this.form.get(['config', 'rowSelectionModelMultiple'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(v => {
                if(v === '1') {
                    this.rowSelectionModel = new SelectionModel<any>(true);
                } else {
                    this.rowSelectionModel = new SelectionModel<any>(false);
                }
            });

        this.form.get(['config', 'tableColumns'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((visibleTableColumns: string[]) => {
                const tableColumns = this.tableColumns;
                const visibilityConfig: DmTableColumnVisibility[] = [];

                for(let i = tableColumns.length; i--;) {
                    const tableColumn = tableColumns[i];
                    visibilityConfig.push({
                        columnId: tableColumn.id,
                        visible: visibleTableColumns.includes(tableColumn.id)
                    });
                }

                this.table.changeColumnsVisibility(visibilityConfig);
            });

        this.form.get(['config', 'rowClicked'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(v => {
                if(v === '1') {
                    this.rowClickedSub = this.table.rowClicked$.subscribe((row: any) => {
                        this.clickedRowData = row;
                    });
                } else {
                    this.rowClickedSub?.unsubscribe();
                    this.clickedRowData = null;
                }
            });

        this.form.get(['config', 'isLoading'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(v => {
                this.table.isLoading = v;
            });

        this.form.get(['config', 'freezeHeaderRow'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(v => {
                if(v === '1') {
                    const maxHeightControl = this.form.get(['config', 'maxHeight']);
                    if(maxHeightControl && maxHeightControl.value === '') {
                        maxHeightControl.setValue('700px');
                    }
                }
            });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
        this.rowClickedSub?.unsubscribe();
    }
}
    `,
    styles: ``
};
