import { Injectable, OnDestroy, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private clientSettings: UserManagerSettings = {
    authority:
      'https://topnotchprod.b2clogin.com/topnotchprod.onmicrosoft.com/B2C_1_susi_social_idp/v2.0',
    client_id: 'c53d58ef-169e-4d9e-aaa6-3b76e53c069a',
    redirect_uri: 'http://localhost:4200/auth-callback',
    silent_redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200',
    response_type: 'code',
    scope:
      'openid profile https://topnotchprod.onmicrosoft.com/backend-function-id/FullAccess',
    loadUserInfo: false,
    filterProtocolClaims: true,
  };
  private manager = new UserManager(this.clientSettings);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private state: string = '';
  private user: User | undefined;
  constructor(private router: Router, private ngZone: NgZone) {
    this.manager.getUser().then((user) => {
      if (user) {
        this.user = user;
        this.isLoggedIn$.next(true);
      }
    });
    this.manager.events.addUserSignedOut(() => {
        this.manager.removeUser().then(() => {
          this.user = undefined;
          this.isLoggedIn$.next(false);
          this.router.navigateByUrl("/home");
        });
      });
  }

  isLoggedIn(): Observable<boolean> {
    return from(
      this.manager.getUser().then((user) => {
        return Boolean(user);
      })
    );
  }

  startAuthentication(state: string): Promise<void> {
    this.state = state;
    return new Promise((resolve, reject) => {
      this.manager
        .signinSilent()
        .then((user) => {
          resolve;
        })
        .catch((exception) => {
          this.manager
            .signinRedirect()
            .then(
              () => {
                resolve;
              },
              () => {
                console.log('rejected');
                reject();
              }
            )
            .catch((error) => {
              console.log('rejected');

              reject();
            });
        });
    });
  }

  private afterAuthentication(user?: User): void {
    if (user) {
      this.user = user;
      this.isLoggedIn$.next(true);

      // if stateURL is null then stay on the current page
      if (this.state) {
        this.ngZone.run(() => this.router.navigateByUrl(this.state));
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('/home'));
      }
    }
  }

  public async completeAuthentication(): Promise<void> {
    try {
      await this.manager.signinSilentCallback().then((user) => {
        this.afterAuthentication(user);
      });
      await this.manager.signinRedirectCallback().then((user) => {
        this.afterAuthentication(user);
      });
    } catch (error) {
      error.message = `Error in completeAuthentication. Error message : ${error.message}`;
    }
  }

  public logout(): Promise<void> {
    return new Promise((resolve) => {
      this.manager
        .signoutRedirect()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          error.message = `Error in logout. Error message : ${error.message}`;
          resolve();
        });
    });
  }

  public getUserName(): string {
    let userName;
    const givenNameClaim = 'name';

    if (this.user && this.user.profile) {
      userName = this.user.profile[givenNameClaim];
    }

    return userName == undefined ? '' : userName;
  }

  ngOnInit() {}
}
