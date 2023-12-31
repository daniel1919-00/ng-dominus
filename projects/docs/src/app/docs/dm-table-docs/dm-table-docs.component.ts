import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DmTableComponent} from "../../../../../dm-table/src/lib/dm-table.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmTableDocsCodeExample} from "./dm-table-docs-code-example";
import {
    DmTableColumnDefinition, DmTableColumnVisibility,
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
    selector: 'app-dm-table-docs',
    standalone: true,
    imports: [
        CommonModule,
        DmTableComponent,
        MatCardModule,
        ComponentDocHeaderComponent,
        MatTabsModule,
        CodeExampleComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        TableDocsComponent,
        MatMenuModule,
        MatSlideToggleModule
    ],
    templateUrl: './dm-table-docs.component.html',
    styleUrl: './dm-table-docs.component.scss',
})
export class DmTableDocsComponent implements OnDestroy {
    form: UntypedFormGroup;
    tableColumns: DmTableColumnDefinition[] = [
        {id: 'column1', name: 'Column 1'},
        {id: 'column2', name: 'Column 2'},
        {id: 'column3', name: 'Column 3'},
        {id: 'column4', name: 'Column 4'},
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

    protected readonly dmTableDocsCodeExample = dmTableDocsCodeExample;

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
                isLoading: [false]
            })
        });

        for(let i = 0; i < 100; ++i) {
            this.tableStaticDataSrc.push({
                column1: i + 1,
                column2: i + 2,
                column3: i + 3,
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
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
        this.rowClickedSub?.unsubscribe();
    }
}
