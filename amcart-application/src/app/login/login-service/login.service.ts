import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    /** Array of login user data. */
    private loginData: IUser[] = [];
    private token: string = "";

    constructor(private http: HttpClientWrapperService) {
      this.getUsers();
    }
  
    /** Method to get all login user data. */
    getUsers(): IUser[] {
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

    loginWithGoogle() : Observable<string>
    {
      return this.http.request<string>(`https://localhost:44379/account/SignInWithGoogle`, Enums.HttpRequestType.get);
    }

    isloggedUser(): Observable<boolean> {
      return this.http.request<boolean>(`https://localhost:44379/account/isAuthenticated`, Enums.HttpRequestType.get, null, {withCredentials: true});
    }

    setToken(token:string) {
      this.token = token;
    }

    logout(): Observable<boolean>
    {
      return this.http.request<boolean>(`https://localhost:44379/account/logout`, Enums.HttpRequestType.get, null);
    }
}
