import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public selectedIndex = 0;
  public paymentInfo = 0;
  constructor() { }

  ngOnInit(): void {
    // this.paymentInfo=0;
   this.continueToReviewOrder();
  }

  tabChanged(value: number): void {
    this.selectedIndex = value;
  }

  continueToReviewOrder(): void {
    console.log('Payment Info ' + this.paymentInfo);
  }

  getPaymentMethodType(value: number): void {
    console.log('Output number is ' + value);
    this.paymentInfo = value;
    console.log('Payment Info ' + this.paymentInfo);
  }
}
