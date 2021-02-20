import { Component, OnChanges, OnInit } from '@angular/core';
import { Enums } from 'src/app/shared/enums/enums';
import { IPaymentDetail } from 'src/app/shared/interfaces/IPaymentDetail';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnChanges {
  public selectedIndex = 0;
  public paymentInfo: number = 0;
  constructor() { }

  ngOnInit(): void {
    //this.paymentInfo=0;
   this.continueToReviewOrder();
  }

  ngOnChanges(){
    // will implement later
    //this.continueToReviewOrder();
  }

  tabChanged(value:number) {
    this.selectedIndex = value;
  }

  continueToReviewOrder(){
    console.log("Payment Info "+ this.paymentInfo);
  }

  getPaymentMethodType(value:number){
    console.log("Output number is "+value);
    this.paymentInfo = value;
    console.log("Payment Info "+ this.paymentInfo);
  }

  abc() {
    console.log("Payment Info "+ this.paymentInfo);
  }

}
