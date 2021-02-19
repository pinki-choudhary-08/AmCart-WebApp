import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { IPaymentDetail } from 'src/app/shared/interfaces/IPaymentDetail';
import { Order } from 'src/app/shared/model/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {

  @Input() paymentType: number| undefined;
  orderData: Order = new Order(
    "bilingIdTest",
    "receipentaddressIdTest",
    "newcustomeridtest",
    [
      {
        productId : "productIdTest",
        sku: "skuTest",
        quantity : 3,
        productPurchasePrice : 112
      }
      
    ]
  );
 
  paymentInfoType: string = '';
  constructor(private orderService:OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getPaymentInfoDetail();
  };

  createNewOrder(orderData: Order){
    this.orderService.createOrder(orderData).subscribe(
      (data: Order) => {
        console.log(data);
        this.router.navigateByUrl("/ordercomplete",{state:data});
      }
    );
  }

  placeOrder()
  {
    this.createNewOrder(this.orderData);
  }

  getPaymentInfoDetail(){
    console.log(this.paymentType)
    if(this.paymentType === 0){
      this.paymentInfoType = "Cash on Delivery"
    } else if(this.paymentType=== 1) {
      this.paymentInfoType = "Pay By Check"
    } else if (this.paymentType === 2){
      this.paymentInfoType = "Online banking"
    } else {
      this.paymentInfoType = "Pay by card"
    }
  }

}
