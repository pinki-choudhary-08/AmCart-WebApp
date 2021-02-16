import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule } from '../app/core/approuting/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatIconModule } from '@angular/material/icon';

import { ShoppingCartComponent } from './order/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { PaymentComponent } from './order/payment/payment.component';
import { AddressComponent } from './order/address/address.component';
import { OrderPlacedComponent } from './order/order-placed/order-placed.component';
import {SigninComponent} from './order/signin/signin.component';
import { ReviewOrderComponent } from './order/review-order/review-order.component';
import { PaymentMethodComponent } from './order/payment-method/payment-method.component';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';
import { AuthService } from './core/auth-service/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    PaymentComponent,
    AddressComponent,
    OrderPlacedComponent,
    SigninComponent,
    ReviewOrderComponent,
    PaymentMethodComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSliderModule,
    MatIconModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
