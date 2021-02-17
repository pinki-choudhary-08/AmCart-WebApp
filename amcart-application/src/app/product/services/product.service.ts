import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ISeachResult } from 'src/app/shared/interfaces/ISearchResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClientWrapperService) { }

  getProductsByDepartment(departmentId: string, continuationToken: string): Observable<ISeachResult<IProduct>>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'continuationToken':  continuationToken
      }),
    };
    return this.http.request<ISeachResult<IProduct>>(`https://localhost:44385/api/ProductDetail/department/${departmentId}`, Enums.HttpRequestType.get, httpOptions);
  }
}
