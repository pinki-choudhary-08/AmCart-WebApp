import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service/auth.service';

@Component({
  selector: 'app-amcart-header',
  templateUrl: './amcart-header.component.html',
  styleUrls: ['./amcart-header.component.css'],
})
export class AmcartHeaderComponent implements OnInit {
  // variable to check user is logged in or not.
  isUserLoggedIn = false;

  //title of the application
  pageTitle = 'Amcart Portal';

  // variable that holds user name.
  username = 'Guest';
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
  ) {
    
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.username = this.authService.getUserName();
        this.isUserLoggedIn = isLoggedIn;
      } else {
        this.isUserLoggedIn = isLoggedIn;
        this.username = 'Guest';
      }
    });
  }

  /**
   * Method that logout the user from the portal.
   */
  public logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public home(){
    this.router.navigate(['/home']);
  }
  /**
   * Method that login the user from the portal.
   */
  public login() {
    this.authService.startAuthentication('');
  }

  /**
   * Method to search by department
   */
  async getByDepartment(department: string) {
    await this.ngZone.run(() =>
    // this.router.navigate(['category'], { relativeTo: "https://locahost:4200", queryParams: { "searchBy": "department", "searchValue": department  }});
      // this.router.navigate(
      //   ['category?searchBy=department&searchValue=${department}'], { replaceUrl: true }
      // )
      this.router.navigateByUrl(
        `category?searchBy=department&searchValue=${department}`, { replaceUrl: true }
      )
    );
  }
}
