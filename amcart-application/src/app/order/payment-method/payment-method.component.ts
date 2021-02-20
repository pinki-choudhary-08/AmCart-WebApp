import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {

  @Output() selectedTabChanged = new EventEmitter<number>();
  @Output() selectPaymentMethodEvent = new EventEmitter<number>();

  private selectedPaymentMethod: number | undefined;

  constructor() { }

  changePaymentMethod(e: any): void{
    this.selectedPaymentMethod = e.target.value;
    console.log(e.target.value);
  }

  selectPaymentMethod(): void{
    this.selectPaymentMethodEvent.emit(this.selectedPaymentMethod);
    this.selectedTabChanged.emit(2);
  }

  onBackClick(): void{
    this.selectedTabChanged.emit(0);
  }

}
