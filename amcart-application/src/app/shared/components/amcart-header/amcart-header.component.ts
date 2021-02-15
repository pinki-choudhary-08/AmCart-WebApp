import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth-service/auth.service';

@Component({
  selector: 'app-amcart-header',
  templateUrl: './amcart-header.component.html',
  styleUrls: ['./amcart-header.component.css']
})
export class AmcartHeaderComponent implements OnInit {

    // variable to check user is logged in or not.
    isUserLoggedIn = false;

    //title of the application
    pageTitle = "Amcart Portal";
  
    // variable that holds user name.
    username = 'Guest';
    constructor(private router: Router,
      private ngZone: NgZone,
      private authService: AuthService) { }
  
    /**
     * sets the user name on the header.
     */
    ngOnInit() {
      this.authService.getUserData().subscribe((userInfo) => {
        if(userInfo) {
          this.username = userInfo.given_name;
          this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
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

    /**
     * Method to search by department
     */
    async getByDepartment(department: string) {
      await this.ngZone.run(() => this.router.navigateByUrl(`category?searchBy=department&searchValue=${department}`));
    }

}
