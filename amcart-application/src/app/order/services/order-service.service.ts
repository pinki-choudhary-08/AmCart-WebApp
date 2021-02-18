import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { IOrder } from 'src/app/shared/interfaces/IOrder';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  baseUrl: string = "https://localhost:44383/api/orderdetail/";
  constructor(private http: HttpClientWrapperService) { }

  getOrderDetail(){

  }

  createOrder(orderData:IOrder){
    return this.http.request<IOrder>(this.baseUrl+"add",Enums.HttpRequestType.post,orderData);
  }

  updateOrderDetail(){

  }

}
