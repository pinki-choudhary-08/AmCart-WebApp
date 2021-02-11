import { Component, OnInit } from '@angular/core';
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
    constructor(private route: Router) { }
  
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
      this.route.navigate(['/home']);
    }

    /**
     * Method to search by department
     */
    getByDepartment(department: string) {
      // call product service
    }

}
