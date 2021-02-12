import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app/core/approuting/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ShoppingCartComponent } from './product/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
