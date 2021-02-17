import { Injectable } from '@angular/core';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  baseUrl: string = "https://localhost:44383/api/orderdetail/";
  constructor(private http: HttpClientWrapperService) { }

  getOrderDetail(){

  }

}
