import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AmcartPageNotFoundComponent } from 'src/app/shared/components/amcart-page-not-found/amcart-page-not-found.component';
import { HomePageModule } from 'src/app/home-page/home-page.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from 'src/app/home-page/home-page/home-page.component';
import { ProductCategoryComponent } from 'src/app/product/product-category/product-category.component';
import { ShoppingCartComponent } from 'src/app/order/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from 'src/app/order/checkout/checkout.component';
import { OrderPlacedComponent } from 'src/app/order/order-placed/order-placed.component';
import { AuthGuardService } from '../../auth-service/auth-guard.service';
import { AuthCallbackComponent } from '../../auth-callback/auth-callback.component';
import { Order } from 'src/app/shared/model/Order';
import { ProductDetailComponent } from 'src/app/product/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'auth-callback', component: AuthCallbackComponent
  },
  {path: 'home', pathMatch: 'full', component: HomePageComponent},
  {path: 'category', pathMatch: 'full', component: ProductCategoryComponent},
  {path: 'product', pathMatch: 'full', component: ProductDetailComponent},
  {path: 'product/:id/sku/:skuId', component: ProductDetailComponent},
  {path: 'cart', pathMatch: 'full', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
  {path: 'checkout', pathMatch: 'full', component: CheckoutComponent, canActivate: [AuthGuardService]},
  {path: 'ordercomplete', pathMatch: 'full', component: OrderPlacedComponent, canActivate: [AuthGuardService]},

  // {path:'dashboard', component: DashboardComponent, children: [...dashboardRoutes], canActivate: [DashboardCanActivateGuard]},
  {path: '**', component: AmcartPageNotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HomePageModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    HomePageModule,
    SharedModule
  ]
})
export class AppRoutingModule {
  constructor() {
    console.log('App routing module loaded.');
  }
 }
