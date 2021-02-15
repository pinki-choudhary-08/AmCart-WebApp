import { Injectable, OnDestroy, NgZone, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { userInfo } from 'os';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
    constructor(public oidcSecurityService: OidcSecurityService) {}

    ngOnInit() {
    }

    logout() {
        this.oidcSecurityService.logoff();
    }

    getUserData(): Observable<any>
    {
        return this.oidcSecurityService.userData$;
    }

}
