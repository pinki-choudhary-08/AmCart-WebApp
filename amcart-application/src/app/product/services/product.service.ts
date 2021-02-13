import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClientWrapperService) { }

  getProductsByDepartment(departmentId: string): Observable<IProduct[]>
  {
    return this.http.request<IProduct[]>(`https://localhost:44385/api/ProductDetail/department/${departmentId}`, Enums.HttpRequestType.get, null);
  }
}
