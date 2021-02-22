import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { CartService } from 'src/app/order/services/cart.service';

@Component({
  selector: 'app-amcart-header',
  templateUrl: './amcart-header.component.html',
  styleUrls: ['./amcart-header.component.css'],
})
export class AmcartHeaderComponent implements OnInit {
  // variable to check user is logged in or not.
  isUserLoggedIn = false;

  // title of the application
  pageTitle = 'Amcart Portal';

  public itemCount = 0;

  // variable that holds user name.
  username = 'Guest';
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    public cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.username = this.authService.getUserName();
        this.isUserLoggedIn = isLoggedIn;
      } else {
        this.isUserLoggedIn = isLoggedIn;
        this.username = 'Guest';
      }
    });

    this.cartService.getCartItemsCount().subscribe((item) => {
      this.itemCount = item;
    });

    this.cartService.incrementAnItems.subscribe((data) => {
      if (data) {
        ++this.itemCount;
      }
      else {
        --this.itemCount;
      }
    });
  }

  /**
   * Method that logout the user from the portal.
   */
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public home(): void {
    this.router.navigate(['/home']);
  }
  /**
   * Method that login the user from the portal.
   */
  public login(): void {
    this.authService.startAuthentication('');
  }

  /**
   * Method to search by department
   */
  async getByDepartment(department: string): Promise<void> {
    await this.ngZone.run(() =>
      // this.router.navigate(['category'], { relativeTo: "https://locahost:4200",
      // queryParams: { "searchBy": "department", "searchValue": department  }});
      // this.router.navigate(
      //   ['category?searchBy=department&searchValue=${department}'], { replaceUrl: true }
      // )
      this.router.navigateByUrl(
        `category?searchBy=department&searchValue=${department}`, { replaceUrl: true }
      )
    );
  }

  public redirectToCart(): void {
    const profile = JSON.parse(sessionStorage.getItem('profile') as string);
    this.router.navigate(['/cart']);
  }
}
