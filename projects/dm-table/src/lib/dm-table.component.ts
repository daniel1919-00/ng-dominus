import {
    AfterViewInit, booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Inject, Injector,
    Input,
    OnChanges,
    OnDestroy, OnInit, Optional,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {
    DM_TABLE_INTL,
    DM_TABLE_RENDER_COMPONENT_DATA,
    DmTableColumnDefinition, DmTableColumnVisibility,
    DmTableDataSource,
    DmTableDataSourceAdapter, DmTableFilters, DmTableIntl, DmTableRenderComponentData,
    DmTableRequestOptions,
} from "./dm-table";
import {Subject, Subscription} from "rxjs";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {HttpClient} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DmTableRenderPipe} from "./dm-table-render.pipe";

@Component({
    selector: 'dm-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        DmTableRenderPipe
    ],
    templateUrl: './dm-table.component.html',
    styleUrl: './dm-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    /**
     * Table column definitions.
     */
    @Input({required: true}) columns!: DmTableColumnDefinition[];
    /**
     * The data source from which rows are fetched.
     * Can be a static array of rows or an url to a server side source.
     * Note: When using server side data source, it is assumed that sorting and pagination is also handled on the server.
     */
    @Input({required: true}) dataSource!: DmTableDataSource;

    /**
     * Overrides the i18n default strings AND the string injected by the DM_TABLE_INTL token.
     * This is mostly useful when dynamic i18n strings are required, or when there are multiple tables on the same page.
     */
    @Input() intl: Record<DmTableIntl, string>;
    /**
     * The request method used when calling the server side data source(GET, POST, etc.).
     */
    @Input() dataSourceRequestMethod: string = 'GET';
    /**
     * Filters that will be sent to the server side data source along with the default parameters (paging, sorting, etc.).
     */
    @Input() filters?: DmTableFilters;
    /**
     * A function that takes the current request options and returns a promise which resolves the final request options to be passed to the angular HttpClient.
     * This is useful if you need to pass additional headers (e.g. Authorization) or modify the data before sending the request to the backend.
     * The same effect can be achieved using an interceptor.
     */
    @Input() onBeforeServerRequestFn?: (requestOptions: DmTableRequestOptions) => Promise<DmTableRequestOptions>;
    /**
     * Adds a contextual menu on each row in a special column added at the end of the table.
     * Use the [rowContextMenuDisplayCondition] @Input to control when this menu is displayed.
     */
    @Input() rowContextMenu: MatMenu | null = null;
    /**
     * Function which determines when the contextual menu is displayed
     */
    @Input() rowContextMenuIsVisibleFn: (row: any) => boolean = () => true;
    /**
     * If set, a column with checkboxes for each row will be appended at the beginning of the table.
     * The SelectionModel will be populated with each of the selected row's data.
     * Note: The table respects whether the selection model supports multiple values or not
     */
    @Input() rowSelectionModel?: SelectionModel<any>;
    /**
     * A function that takes the rows as an argument and returns them back.
     * This is useful when you need to alter row data from a server side data source before being rendered.
     */
    @Input() mapRowsFn?: (rows: any[]) => any[];
    /**
     * Weather a highlight effect will be rendered when the user hovers the cursor over a row.
     */
    @Input() rowHoverEffectEnabled = false;
    /**
     * Highlights even rows
     */
    @Input() stripedRows = false;
    /**
     * Adds a border to the table
     */
    @Input() outline = true;
    /**
     * Whether to display a loading animation when loading data from a server.
     * The animation can also manually be triggered.
     */
    @Input() loadingAnimationEnabled = true;
    /**
     * Whether pagination will be enabled.
     */
    @Input() paginate = true;
    /**
     * Shows paginator first/last buttons
     */
    @Input() showFirstLastButtons = true;
    /**
     * Hides paginator page size info
     */
    @Input() hidePageSize = false;
    /**
     * The default page size.
     */
    @Input() pageSize = 10;
    /**
     * The page sizes available to the user.
     */
    @Input() pageSizeOptions = [5, 10, 20, 30, 40, 50];
    /**
     * The position of the sorting arrow
     */
    @Input() sortingArrowPosition: 'before' | 'after' = 'after';

    /**
     * Event triggered when a row has been clicked.
     * The event contains the row data.
     */
    @Output('rowClicked') rowClicked$ = new Subject<any>();

    protected displayedColumns: string[] = [];
    protected dataSourceAdapter!: DmTableDataSourceAdapter;
    protected _isLoading = false;
    protected loadingDataSub?: Subscription;
    protected masterCheckboxChecked = false;
    protected masterCheckboxIndeterminate = false;
    protected readonly DominusTableIntl = DmTableIntl;
    protected containerClasses: {
        [key: string]: boolean
    } = {};

    @ViewChild(MatPaginator) private paginator?: MatPaginator;
    @ViewChild(MatSort) private sort!: MatSort;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private http: HttpClient,
        private injector: Injector,
        @Optional() @Inject(DM_TABLE_INTL) intl?: Record<DmTableIntl, string>
    ) {
        this.intl = Object.assign({
            [DmTableIntl.NO_DATA]: 'No data',
            [DmTableIntl.LOADING]: 'Loading...'
        }, intl || {});
    }

    ngOnInit() {
        this.prepareDisplayedColumns();
        this.updateContainerClasses();
    }

    ngAfterViewInit() {
        this.setDataSrcAdapter(true);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            (changes['dataSource'] && !changes['dataSource'].firstChange)
            || (changes['filters'] && !changes['filters'].firstChange)
        ) {
            this.setDataSrcAdapter();
        }

        const headerNeedsUpdate = (changes['columns'] && !changes['columns'].firstChange) || (changes['rowSelectionModel'] && !changes['rowSelectionModel'].firstChange);
        const updateContainerClasses = (changes['outline'] && !changes['outline'].firstChange) || (changes['stripedRows'] && !changes['stripedRows'].firstChange)

        if (
            headerNeedsUpdate
            || updateContainerClasses
            || (changes['rowHoverEffectEnabled'] && !changes['rowHoverEffectEnabled'].firstChange)
            || (changes['pageSizeOptions'] && !changes['pageSizeOptions'].firstChange)
            || (changes['paginate'] && !changes['paginate'].firstChange)
            || (changes['loadingDataOverlay'] && !changes['loadingDataOverlay'].firstChange)
            || (changes['sortingArrowPosition'] && !changes['sortingArrowPosition'].firstChange)
            || (changes['rowContextMenu'] && !changes['rowContextMenu'].firstChange)
            || (changes['intl'] && !changes['intl'].firstChange)
        ) {
            headerNeedsUpdate && this.prepareDisplayedColumns();
            updateContainerClasses && this.updateContainerClasses();
            this.changeDetector.markForCheck();
        }
    }

    /**
     * Refreshes the table data
     * @param resetPage whether the page will be reset as well
     */
    refresh(resetPage = true) {
        this.dataSourceAdapter.refresh(resetPage);
    }

    /**
     * Hides/shows or toggles the specified table column's visibility
     * @param columnId
     * @param visible If not specified, the visibility will be toggled
     */
    changeColumnVisibility(columnId: string, visible?: boolean) {
        const column = this.getColumn(columnId);
        if(!column) {
            return;
        }

        column.visible = typeof visible === 'undefined' ? !column.visible : visible;
        this.prepareDisplayedColumns();
        this.changeDetector.markForCheck();
    }

    /**
     * Changes the visibility of multiple columns
     * @param columns The columns and their visibility. Example: [{columnId: 'myColumn1', visible: true}, {columnId: 'myOtherColumn', visible: false}] -- sets myColumn1 to visible and hides myOtherColumn
     */
    changeColumnsVisibility(columns: DmTableColumnVisibility[]) {
        for(let i = columns.length; i--;) {
            const colVisibilityConfig = columns[i];
            const column = this.getColumn(colVisibilityConfig.columnId);
            if(!column) {
                continue;
            }

            column.visible = typeof colVisibilityConfig.visible !== "undefined" ? colVisibilityConfig.visible : !column.visible;
        }

        this.prepareDisplayedColumns();
        this.changeDetector.markForCheck();
    }

    /**
     * Returns the table current loading state
     */
    get isLoading(): boolean {
        return this._isLoading;
    }

    /**
     * Activates or deactivates the table's loading state
     * @param state
     */
    @Input({transform: booleanAttribute}) set isLoading(state: boolean) {
        if(this._isLoading !== state) {
            this._isLoading = state;
            this.changeDetector.detectChanges();
        }
    }

    protected toggleAllRowsSelection($event: MatCheckboxChange) {
        const rowSelectionModel = this.rowSelectionModel;
        if(!rowSelectionModel) {
            return;
        }

        const rows = this.dataSourceAdapter.data;
        if($event.checked) {
            for(let i = rows.length; i--;) {
                rowSelectionModel.select(rows[i]);
            }

            this.masterCheckboxChecked = true;
            this.masterCheckboxIndeterminate = rowSelectionModel.selected.length !== this.dataSourceAdapter.getTotalResults();
        } else {
            rowSelectionModel.clear();
            this.masterCheckboxChecked = false;
            this.masterCheckboxIndeterminate = false;
        }
    }

    protected toggleRowSelection(row: any) {
        const rowSelectionModel = this.rowSelectionModel;
        if(!rowSelectionModel) {
            return;
        }

        rowSelectionModel.toggle(row);

        if(rowSelectionModel.isEmpty()) {
            this.masterCheckboxChecked = false;
            this.masterCheckboxIndeterminate = false;
        } else {
            this.masterCheckboxChecked = true;
            this.masterCheckboxIndeterminate = rowSelectionModel.selected.length !== this.dataSourceAdapter.getTotalResults();
        }
    }

    protected createRenderComponentInjector(column: DmTableColumnDefinition, columnData: any) {
        return Injector.create({
            providers: [{
                provide: DM_TABLE_RENDER_COMPONENT_DATA,
                useValue: {
                    columnId: column.id,
                    columnData,
                    arguments: column.renderUsing?.arguments
                } as DmTableRenderComponentData
            }],
            parent: this.injector
        });
    }

    private updateContainerClasses() {
        this.containerClasses = {
            'outline': this.outline,
            'striped': this.stripedRows
        };
    }

    private getColumn(columnId: string) {
        const columns = this.columns;
        let foundColumn: undefined|DmTableColumnDefinition;

        for(let i = columns.length; i--;) {
            const col = columns[i];
            if(col.id === columnId) {
                foundColumn = col;
                break;
            }
        }

        return foundColumn;
    }

    private prepareDisplayedColumns() {
        const columns = this.columns;
        const colLen = columns.length;
        const _displayedColumns = [];

        if(this.rowSelectionModel) {
            _displayedColumns.push('dm_table_row_selection_column');
        }

        for (let colIndex = 0; colIndex < colLen; ++colIndex) {
            const column = columns[colIndex];
            if (column.visible === undefined || column.visible) {
                _displayedColumns.push(column.id);
            }
        }

        if (this.rowContextMenu) {
            _displayedColumns.push('dm_table_row_contextual_menu_column');
        }

        this.displayedColumns = _displayedColumns;
    }

    private setDataSrcAdapter(initialSet = false) {
        if(!initialSet) {
            this.loadingDataSub?.unsubscribe();
            if(this.sort.active !== '') {
                this.sort.active = '';
                this.sort.direction = '';
                this.sort._stateChanges.next();
            }

            if(this.paginator) {
                this.paginator.length = 0;
                this.paginator.pageIndex = 0;
            }
        }

        const dataSourceAdapter = new DmTableDataSourceAdapter(
            this.dataSourceRequestMethod,
            this.http,
            this.dataSource,
            this.sort,
            this.onBeforeServerRequestFn || ((requestOptions: DmTableRequestOptions) => new Promise((resolve) => { resolve(requestOptions); })),
            this.paginator,
            this.mapRowsFn,
            this.filters
        );

        if(this.loadingAnimationEnabled) {
            this.loadingDataSub = dataSourceAdapter.onDataLoading().subscribe(loading => this.isLoading = loading);
        }

        this.dataSourceAdapter = dataSourceAdapter;
    }

    ngOnDestroy() {
        this.rowClicked$.complete();
        this.loadingDataSub?.unsubscribe();
    }
}
