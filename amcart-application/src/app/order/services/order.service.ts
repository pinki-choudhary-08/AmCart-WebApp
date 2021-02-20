import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { Order } from 'src/app/shared/model/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = environment.urlConstant.orderServiceBaseUrl;
  constructor(private http: HttpClientWrapperService) {}

  getOrderDetailById(orderId: string): Observable<Order> {
    return this.http.request<Order>(
      `${this.baseUrl}\${orderId}`,
      Enums.HttpRequestType.get
    );
  }

  createOrder(orderData: Order) {
    return this.http.request<Order>(
      `${this.baseUrl}\add`,
      Enums.HttpRequestType.post,
      orderData
    );
  }

  updateOrderDetail() {}
}
