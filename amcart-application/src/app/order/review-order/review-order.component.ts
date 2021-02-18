import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IPaymentDetail } from 'src/app/shared/interfaces/IPaymentDetail';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {

  @Input() paymentType: number| undefined;
 
  paymentInfoType: string = '';
  constructor() { }

  ngOnInit(): void {
    this.getPaymentInfoDetail();
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
