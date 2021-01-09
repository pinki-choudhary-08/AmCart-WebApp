import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmcartHeaderComponent } from './components/amcart-header/amcart-header.component';
import { AmcartFooterComponent } from './components/amcart-footer/amcart-footer.component';
import { AmcartPageNotFoundComponent } from './components/amcart-page-not-found/amcart-page-not-found.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTabsModule } from '@angular/material/tabs';

import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [AmcartHeaderComponent, AmcartFooterComponent, AmcartPageNotFoundComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    ToastrModule,
    AmcartHeaderComponent,
    AmcartFooterComponent,
    AmcartPageNotFoundComponent
  ]
})
export class SharedModule { }
