import {BehaviorSubject, catchError, merge, Observable, Subscription, throwError} from "rxjs";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ngClassCompatible} from "../shared/types";
import {FormGroup} from "@angular/forms";
import {InjectionToken, ProviderToken, Type} from "@angular/core";

export interface DmTableColumnDefinition {
    /**
     * This will be matched against the data source when providing value for this column.
     * For example the column id 'my_column' should be found in the data source, like so: [{'my_column': 'column_value'}, ...].
     */
    id: string;
    /**
     * The column display name.
     */
    name: string;
    /**
     * Classes to be placed on the whole column (th & td).
     * The values must be compatible with ngClass.
     */
    classes?: ngClassCompatible;
    /**
     * Is this column sortable?
     */
    sortable?: boolean;
    /**
     * Whether this column is displayed or hidden.
     */
    visible?: boolean;
    /**
     * Render this column using a pipe or a component.
     * If both are set, the component property takes priority
     */
    renderUsing?: {
        component?: Type<any>;
        pipe?: ProviderToken<any>;
        /**
         * arguments to be passed to either the pipe or the component
         */
        arguments?: any[] | {[key: string]: any}
    };
}

export interface DmTableRow {
    [columnId: string]: any;
}

export interface DmTableRenderComponentData {
    columnId: string;
    columnData: string;
    arguments: any[] | {[key: string]: any};
}

export enum DmTableIntl {
    NO_DATA,
    LOADING
}

export const DM_TABLE_INTL = new InjectionToken<Record<DmTableIntl, string>>('Dominus table i18n strings');
export const DM_TABLE_RENDER_COMPONENT_DATA = new InjectionToken<DmTableRenderComponentData>('DM_TABLE_RENDER_COMPONENT_DATA');

export type DmTableDataSource = string | { [columnId: string]: any }[];
export type DmTableFilters = {[filter: string]: any} | FormGroup;

export interface DmTableDataServerResponse {
    totalResults: number;
    rows: DmTableRow[];
}

export interface DmTableRequestOptions {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    responseType?: 'json';
}

export interface DmTableColumnVisibility {
    columnId: string;
    /**
     * If not specified, the visibility will be toggled
     */
    visible?: boolean;
}

export class DmTableDataSourceAdapter extends MatTableDataSource<any> {
    private totalResults = 0;
    private eventsSub: Subscription;
    private loadingData$ = new BehaviorSubject<boolean>(false);
    private readonly paginatorRef?: MatPaginator;
    private readonly sortRef?: MatSort;

    constructor(
        private requestMethod: string,
        private http: HttpClient,
        private dataSrc: DmTableDataSource,
        sort: MatSort,
        private readonly onBeforeRequest: (requestOptions: DmTableRequestOptions) => Promise<DmTableRequestOptions>,
        paginator?: MatPaginator,
        private mapRowsFn?: (rows: any[]) => any[],
        private filters?: DmTableFilters,
    ) {
        super();

        this.sortRef = sort;
        this.paginatorRef = paginator;

        if(typeof dataSrc !== 'string') {
            this.sort = sort;
            if(paginator) {
                this.paginator = paginator;
            }
        }

        this.eventsSub = (paginator?.page ? merge(sort.sortChange, paginator.page) : sort.sortChange).subscribe((event: any) => this.refresh(event.pageIndex === undefined));
    }

    override connect() {
        this.refresh(false);
        return super.connect();
    }

    getTotalResults() {
        return this.totalResults;
    }

    refresh(resetPage = true) {
        if(this.loadingData$.getValue()) {
            return;
        }

        const paginator = this.paginatorRef;
        const dataSrc = this.dataSrc;

        if (resetPage && paginator) {
            paginator.pageIndex = 0;
        }

        if (typeof dataSrc === 'string') {
            return this.handleServerSideDataSrc(dataSrc);
        }

        const mapRowsFn = this.mapRowsFn;
        this.data = mapRowsFn ? mapRowsFn(dataSrc) : dataSrc;
        this.totalResults = this.data.length;
    }

    onDataLoading(): Observable<boolean> {
        return this.loadingData$.asObservable();
    }

    private handleServerSideDataSrc(dataSource: string) {
        this.loadingData$.next(true);

        const requestMethod = this.requestMethod.toUpperCase();
        const requestOptions: DmTableRequestOptions = {
            responseType: 'json',
            observe: "body"
        };


        const filters = this.filters;

        let requestData;
        if(filters instanceof FormGroup) {
            requestData = Object.assign({}, filters.value || {});
        } else {
            requestData = filters || {};
        }

        requestData['dm_sort_col'] = this.sortRef?.active || '';
        requestData['dm_sort_dir'] = this.sortRef?.direction || '';
        requestData['dm_page_index'] = this.paginatorRef?.pageIndex || 0;
        requestData['dm_page_len'] = this.paginatorRef?.pageSize || 0;

        if(requestMethod === 'GET')
        {
            requestOptions.params = requestData;
        }
        else
        {
            requestOptions.body = requestData;
        }

        this.onBeforeRequest(requestOptions).then(options => {
            this.http.request<DmTableDataServerResponse>(requestMethod, dataSource, options)
                .pipe(catchError((error) => {
                    this.data = [];
                    this.loadingData$.next(false);
                    return throwError(() => new Error(`Table data request from ${dataSource} failed! Error: ${error.message || 'Unknown'}`));
                }))
                .subscribe((response) => {
                    if (response && response.rows) {
                        if (this.paginatorRef) {
                            this.paginatorRef.length = response.totalResults;
                        }
                        this.totalResults = response.totalResults;

                        this.data = this.mapRowsFn ? this.mapRowsFn(response.rows) : response.rows;
                    }
                    this.loadingData$.next(false);
                });
        });
    }

    override disconnect(): void {
        this.eventsSub.unsubscribe();
        this.loadingData$.complete();
        super.disconnect();
    }
}
