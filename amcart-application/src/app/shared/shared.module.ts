import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmcartHeaderComponent } from './components/amcart-header/amcart-header.component';
import { AmcartFooterComponent } from './components/amcart-footer/amcart-footer.component';
import { AmcartPageNotFoundComponent } from './components/amcart-page-not-found/amcart-page-not-found.component';
import { SampleDirectiveDirective } from './directives/sample-directive.directive';
import { SamplePipePipe } from './interfaces/sample-pipe.pipe';
import { SamplePipe } from './pipes/sample.pipe';
import { SampleDirective } from './directives/sample.directive';



@NgModule({
  declarations: [AmcartHeaderComponent, AmcartFooterComponent, AmcartPageNotFoundComponent, SampleDirectiveDirective, SamplePipePipe, SamplePipe, SampleDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
