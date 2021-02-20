import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import {MatBadgeModule} from '@angular/material/badge';

import { ToastrModule } from 'ngx-toastr';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';



@NgModule({
  declarations: [AmcartHeaderComponent, AmcartFooterComponent, AmcartPageNotFoundComponent, SearchBarComponent, BannerCarouselComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatCarouselModule.forRoot(),
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
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCarouselModule,
    MatBadgeModule,
    ToastrModule,
    AmcartHeaderComponent,
    AmcartFooterComponent,
    AmcartPageNotFoundComponent,
    SearchBarComponent,
    BannerCarouselComponent
  ]
})
export class SharedModule { }
