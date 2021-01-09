import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    /** Array of login user data. */
    private loginData: IUser[] = [];

    constructor() {
      this.getUsers();
    }
  
    /** Method to get all login user data. */
    getUsers(): IUser[] {
      this.loginData = [{
        "id": 1,
        "username": "pinki",
        "password": "pinki"
      }, {
        "id": 2,
        "username": "admin",
        "password": "admin"
      }];
      return this.loginData;
    }
  
    /** Method that validates login credentials passed by user. */
    validateUser(user: IUser): boolean {
      let validUser = false;
      if (this.loginData.findIndex(usr => user.username.toLowerCase() === usr.username.toLowerCase()) > -1) {
        validUser = true;
      }
      return validUser;
    }
}
