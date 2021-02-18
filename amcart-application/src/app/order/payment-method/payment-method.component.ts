import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  @Output() selectPaymentMethodEvent = new EventEmitter<number>();

  private selectedPaymentMethod: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  changePaymentMethod(e:any){
    this.selectedPaymentMethod = e.target.value;
    console.log(e.target.value);
  }
  
  selectPaymentMethod(){
    this.selectPaymentMethodEvent.emit(this.selectedPaymentMethod);
  }

}
