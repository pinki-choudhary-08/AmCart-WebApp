import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amcart-page-not-found',
  templateUrl: './amcart-page-not-found.component.html',
  styleUrls: ['./amcart-page-not-found.component.css']
})
export class AmcartPageNotFoundComponent {
  constructor(private route: Router) { }

  /**
   * Redirect user to home page.
   */
  goBack(): void {
      this.route.navigate(['/home']);
  }

}
