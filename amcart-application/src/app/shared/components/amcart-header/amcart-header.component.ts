import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amcart-header',
  templateUrl: './amcart-header.component.html',
  styleUrls: ['./amcart-header.component.css']
})
export class AmcartHeaderComponent implements OnInit {

    // variable to check user is logged in or not.
    isUserLoggedIn = true;

    //title of the application
    pageTitle = "Amcart Portal";
  
    // variable that holds user name.
    username = 'Guest';
    constructor(private router: Router,
      private ngZone: NgZone) { }
  
    /**
     * sets the user name on the header.
     */
    ngOnInit() {
      if (localStorage.getItem('TOKEN') !== null) {
        this.username = 'Log out ' + localStorage.getItem('username');
        this.isUserLoggedIn = true;
      }
    }
  
    /**
     * Method that logout the user from the portal.
     */
    logout() {
      localStorage.clear();
      this.router.navigate(['/home']);
    }

    /**
     * Method to search by department
     */
    async getByDepartment(department: string) {
      await this.ngZone.run(() => this.router.navigateByUrl(`category?searchBy=department&searchValue=${department}`));
    }

}
