import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { ICategory } from 'src/app/shared/interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClientWrapperService) { }

  getCategoriesByDepartment(departmentId: string): Observable<ICategory[]>
  {
    return this.http.request<ICategory[]>(`https://localhost:44385/api/category/department/${departmentId}`, Enums.HttpRequestType.get, null);
  }
}
