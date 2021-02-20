import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestType } from '../../shared/enums/enums';
import { retry } from 'rxjs/operators';
import { APIConstants } from '../../shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {

  constructor(private http: HttpClient, private httpErrorHandlerService: HttpErrorHandlerService) { }

  public request<T>(url: string, method: HttpRequestType, requestBody?: any, options?: any): Observable<T> {
    return new Observable((observer: any) => {
      this.http.request(new HttpRequest(method, url, requestBody, options))
        .pipe(
          retry(APIConstants.Retry),
        )
        .subscribe(
          (response) => {
            if (response.type === HttpEventType.Response) {
              observer.next(response.body);
              observer.complete();
            }
          },
          (error) => {
            const errorInfo = `Error in URL: ${url}, Request Type: ${method} and Payload: ${JSON.stringify(requestBody)}`;
            this.httpErrorHandlerService.handleException(error, errorInfo);
            observer.error(error);
          });
    });
  }
}
