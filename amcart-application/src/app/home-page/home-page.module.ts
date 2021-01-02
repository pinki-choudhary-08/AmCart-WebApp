import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    SharedModule,
    CommonModule
  ]
})
export class HomePageModule { }
