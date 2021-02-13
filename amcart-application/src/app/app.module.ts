import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    PaymentComponent,
    AddressComponent,
    OrderPlacedComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSliderModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
