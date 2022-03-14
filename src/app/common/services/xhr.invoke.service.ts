
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiOptionInterface } from '../entities/xhr-request';
import { StringConstants } from '../entities/constants';

/**
   * It is a facade service which enables developers not to inject httpClient
   * everywhere whenever theres is need to make a network call. 
   */
@Injectable({
    providedIn: 'root'
})
export class XhrInvokeService {
    constructor(private http: HttpClient) { }
    /**
     * Make the service call to controller using the request options send by the consumer subscriber
     * @param options {{ApiOptionInterface}}
     * 
     */
    invokeControllerAPI(options: ApiOptionInterface): Observable<any> {
        // If header is passed then set it otherwise the default one will get applied.
        const headerOptions = options.header ? options.header :
            { 'Content-Type': StringConstants.HTTP_HEADERS.CONTENT_TYPE_DEFAULT };

        const headers = new HttpHeaders(headerOptions);
        let req = new HttpRequest(options.method, options.url, options?.data, {
            headers,
            responseType: <any>options?.responseType || StringConstants.HTTP_RESPONSE_TYPES.JSON
        })
        return this.http.request(req).pipe(
            filter(event => event.type === HttpEventType.Response),
            map((event) => (event as HttpResponse<any>).body),
            catchError(error => {
                throw error;
            })
        );
    }
}
