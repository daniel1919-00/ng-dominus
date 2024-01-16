import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {from, lastValueFrom, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {timeoutAsync} from "./common";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleRequest(req, next));
    }

    private async handleRequest(req: HttpRequest<any>, next: HttpHandler) {
        const requestedEndpoint = req.url.replace('https://localhost/', '').split('/');
        //const endpointMethod = requestedEndpoint[1];
        switch (requestedEndpoint[0]) {
            case 'uploader': return await this.getUploaderResponse();
            case 'table': return await this.getTableResponse(req);
            default: return await lastValueFrom(next.handle(req));
        }
    }

    private async getUploaderResponse() {
        return new HttpResponse({status: 200, body: {}});
    }

    private async getTableResponse(request: HttpRequest<any>) {

        let pageIndex: number, pageLen: number, sortCol: string, sortDir: string;
        if(request.method === 'GET') {
            pageIndex = +(request.params.get('dm_page_index') || 0);
            pageLen = +(request.params.get('dm_page_len') || 0);
            sortCol = request.params.get('dm_sort_col') || '';
            sortDir = request.params.get('dm_sort_dir') || '';
        } else {
            const requestBody = request.body;

            pageIndex = requestBody.dm_page_index;
            pageLen = requestBody.dm_page_len;
            sortCol = requestBody.dm_sort_col;
            sortDir = requestBody.dm_sort_dir
        }

        const data = [];
        const maxResults = 100;
        let startRow = pageIndex * pageLen;
        let endRow = startRow + pageLen;
        if(endRow > maxResults) {
            endRow = maxResults;
        }

        const date = new Date();
        for(let i = 0; i < maxResults; ++i) {
            date.setDate(date.getDate() + 1);
            data.push({
                column1: i + 1,
                column2: i + 2,
                column3: date.toUTCString(),
                column4: i + 4,
            });
        }

        if(sortCol !== '') {

            let sortOrderAHigher = 1;
            let sortOrderALower = -1;

            if(sortDir === 'desc') {
                sortOrderAHigher = -1;
                sortOrderALower = 1;
            }

            data.sort((a: any, b: any) => {
                const colValA = a[sortCol];
                const colValB = b[sortCol];

                if (colValA > colValB) return sortOrderAHigher;
                if (colValA < colValB) return sortOrderALower;

                return 0;
            });
        }

        await timeoutAsync(2000);
        return new HttpResponse({
            status: 200,
            body: {
                totalResults: maxResults,
                rows: data.slice(startRow, endRow)
            }
        });
    }
}
