import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AmcartPageNotFoundComponent } from 'src/app/shared/components/amcart-page-not-found/amcart-page-not-found.component';
import { HomePageModule } from 'src/app/home-page/home-page.module';
import { LoginModule } from 'src/app/login/login.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from 'src/app/home-page/home-page/home-page.component';
import { LoginComponent } from 'src/app/login/login/login.component';
import { ProductCategoryComponent } from 'src/app/product/product-category/product-category.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomePageComponent},
  {path:'login', component: LoginComponent},
  {path:'category',component: ProductCategoryComponent},
  //{path:'dashboard', component: DashboardComponent, children: [...dashboardRoutes], canActivate: [DashboardCanActivateGuard]},
  {path: '**', component: AmcartPageNotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    LoginModule,
    HomePageModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    LoginModule,
    HomePageModule,
    SharedModule
  ]
})
export class AppRoutingModule {
  constructor() {
    console.log("App routing module loaded.")
  }
 }
