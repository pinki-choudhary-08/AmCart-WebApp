import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app/core/approuting/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';

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
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
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
    AuthCallbackComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSliderModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class AppModule { }
