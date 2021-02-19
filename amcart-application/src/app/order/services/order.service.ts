import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { Order } from 'src/app/shared/model/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = "https://localhost:44383/api/orderdetail/";
  constructor(private http: HttpClientWrapperService) { }

  getOrderDetail(){

  }

  createOrder(orderData:Order){
    return this.http.request<Order>(this.baseUrl+"add",Enums.HttpRequestType.post,orderData);
  }

  updateOrderDetail(){

  }

}
