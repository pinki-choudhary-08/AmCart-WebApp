import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { Address } from 'src/app/shared/model/Address';
import { CartDetail } from 'src/app/shared/model/CartDetail';
import { ProductShortDetail } from 'src/app/shared/model/ProductShortDetail';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public selectedIndex = 0;
  public paymentInfo = 0;
  public cartDetailObj = new CartDetail();
  public cartSubTotal = 0;
  public totalAmount = 0;
  public productInfo!: ProductShortDetail[];
  public selectedAddress!: Address;

  constructor(private authService: AuthService,
    private cartService: CartService,
    private spinnerService: NgxSpinnerService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    // this.paymentInfo=0;
    this.spinnerService.show();
    this.continueToReviewOrder();
    this.getCartDetails();
  }

  private getCartDetails(): void {
    this.cartService.getCartDetailByCustomerId(this.authService.getUserEmail()).subscribe((result) => {
      this.cartDetailObj = result;
      this.productInfo = result.productInfo;
      result?.productInfo.forEach((item) => {
        this.cartSubTotal += (item.quantity * parseInt(item.price));
      });
      this.spinnerService.hide();
    });
  }

  tabChanged(value: number): void {
    this.selectedIndex = value;
  }

  public selectedAddressChanged(addressId: string): void {
    this.selectedAddress = this.addressService.getAddressesById(addressId, this.authService.getUserEmail());
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
