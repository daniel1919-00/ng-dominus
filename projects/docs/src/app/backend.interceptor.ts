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
            case 'table': return await this.getTableResponse(req.body);
            default: return await lastValueFrom(next.handle(req));
        }
    }

    private async getUploaderResponse() {
        return new HttpResponse({status: 200, body: {}});
    }

    private async getTableResponse(requestBody: any) {
        const data = [];
        const maxResults = 100;
        let startRow = requestBody.dm_page_index * requestBody.dm_page_len;
        let endRow = startRow + requestBody.dm_page_len;
        if(endRow > maxResults) {
            endRow = maxResults;
        }

        for(let i = 0; i < maxResults; ++i) {
            data.push({
                column1: i + 1,
                column2: i + 2,
                column3: i + 3,
                column4: i + 4,
            });
        }

        if(requestBody.dm_sort_col !== '') {

            let sortOrderAHigher = 1;
            let sortOrderALower = -1;

            if(requestBody.dm_sort_dir === 'desc') {
                sortOrderAHigher = -1;
                sortOrderALower = 1;
            }

            data.sort((a: any, b: any) => {
                const colValA = a[requestBody.dm_sort_col];
                const colValB = b[requestBody.dm_sort_col];

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
