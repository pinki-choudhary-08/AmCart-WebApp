import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { IProductDetail } from 'src/app/shared/interfaces/IProductDetail';
import { IProductShortDetail } from 'src/app/shared/interfaces/IProductShortDetail';
import { ISeachResult } from 'src/app/shared/interfaces/ISearchResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "https://localhost:44385/api/ProductDetail/"

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

  getProductByIdAndSKU(productId: string, sku: string): Observable<IProductDetail>
  {
   console.log("In product service. ProductId is "+productId+" And sku is "+sku);
    return this.http.request<IProductDetail>(this.baseUrl+productId+"/sku/"+sku,Enums.HttpRequestType.get)
  }
}
