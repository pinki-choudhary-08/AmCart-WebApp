import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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

  @Output() selectedTabChanged = new EventEmitter<number>();
  @Input() paymentType: number| undefined;
  orderData: Order = new Order(
    "64a95a8e-7135-4084-86a6-df0088f22776",
    "",
    "bilingIdTest",
    "receipentaddressIdTest",
    "newcustomeridtest",
    "INVdata",
    [
      {
        productId : "productIdTest",
        sku: "skuTest",
        quantity : 3,
        media: [
          {
              thumbnailUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg",
              baseUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg"
          }
      ],
        features:{
          color: "black",
          size:"l"
        },
        price:1000,
        tax:500,
        shortDescription:"We can describe it shortly"
      }
      
    ]
  );
 
  paymentInfoType: string = '';
  constructor(private orderService:OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getPaymentInfoDetail();
  };

  createNewOrder(orderData: Order){
    // this.orderService.createOrder(orderData).subscribe(
    //   (data: Order) => {
    //     console.log(data);
    //     this.router.navigateByUrl("/ordercomplete",{state:{orderId:this.orderData.id}});
    //   }
    // );
    this.router.navigateByUrl("/ordercomplete",{state:{orderId:this.orderData.id}});
  }

  placeOrder()
  {
    this.createNewOrder(this.orderData);
  }

  onCancel() {
    this.router.navigateByUrl("/home");
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

  onBackClick() {
    this.selectedTabChanged.emit(1);
  }

}
