// import { Injectable, OnDestroy, NgZone } from '@angular/core';
// import { UserManager, UserManagerSettings, User } from 'oidc-client';
// import { Router } from '@angular/router';
// import { Observable, from, BehaviorSubject } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { LoggerService } from '../services/logger.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Enums } from 'src/app/shared/utilities/enums';
// import { ABTestScenarioService } from '../ab-testing/ab-test-scenario.service';
// import { BetaProgramPermissionProvider } from '../authorization/beta-program-permission-provider';
// import { GuestAccessPermissions } from '../authorization/permissions/guest-access-permissions';
// import { SessionService } from '../sessions/session.service';
// import { UserPreferencesService } from '../userPreferences/user-preferences.service';

// // Fixes dual-screen position. In case of Most browsers window.screenLeft but for Firefox window.screenX
// const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
// const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

// const width = screen.width ? screen.width : window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
// const height = screen.height ? screen.height : window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
// const systemZoom = width / window.screen.availWidth;
// const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
// const top = (height - 600) / 2 / systemZoom + dualScreenTop;

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService implements OnDestroy {
//   private user: User = null;
//   private guestAccessEnabled = true;

//   private clientSettings: UserManagerSettings = {
//     authority: environment.URLConstant.UM_Identity_Url,
//     client_id: environment.URLConstant.Client_Key,
//     client_secret: environment.URLConstant.Client_Secret,
//     popup_redirect_uri: environment.URLConstant.Redirect_URI,
//     silent_redirect_uri: environment.URLConstant.Redirect_URI,
//     post_logout_redirect_uri: environment.URLConstant.Logout_Redirect_URI,
//     response_type: 'code',
//     scope: 'all_um_claims offline_access openid profile email',
//     popupWindowFeatures: `width=` + 500 / systemZoom + `,height=` + 600 / systemZoom + `,left=` + left + `,top=` + top,
//     filterProtocolClaims: true,
//     monitorSession: false,
//     loadUserInfo: true
//   };

//   private manager = new UserManager(this.clientSettings);
//   private featurePermissions: string[] = [];
//   public isUserLoggedOut = false;
//   private tokenRefreshSubscription;
//   public isGuestAccessEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
//   private hasSilentSignInCalled = false;

//   constructor(private router: Router,
//     private loggerService: LoggerService,
//     private httpClient: HttpClient,
//     private ngZone: NgZone,
//     private abTestScenarioService: ABTestScenarioService,
//     private userPreferenceService: UserPreferencesService,
//     private sessionService: SessionService
//   ) {
//     this.setUser();
//     this.tokenRefreshSubscription = () => this.refreshToken();
//     this.manager.events.addAccessTokenExpiring(this.tokenRefreshSubscription);
//   }

//   ngOnDestroy() {
//     this.manager.events.removeAccessTokenExpiring(this.tokenRefreshSubscription);
//   }

//   private setUser(): Promise<void> {
//     return this.manager.getUser().then(user => {
//       this.user = user;
//       this.guestAccess = Boolean(!user);
//       this.resetUserPermissions();
//     });
//   }

//   public set guestAccess(turnOn: boolean) {
//     if (this.guestAccessEnabled !== turnOn) {
//       this.guestAccessEnabled = turnOn;
//       this.isGuestAccessEnabled$.next(turnOn);
//     }
//   }

//   public get guestAccess(): boolean {
//     return this.guestAccessEnabled;
//   }

//   public isLoggedIn(): Observable<boolean> {
//     return from(this.manager.getUser().then((user) => {
//       return Boolean(user);
//     })
//     );
//   }

//   // Todo - why is this used and not the other methods?
//   public isAuthorized(): Observable<boolean> {

//     return from(this.loadFeaturePermissionsFromUM()
//       .then((result) => {
//         return result;
//       })
//     );
//   }

//   public getUserName(): string {
//     let userName = null;
//     const givenNameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname';

//     if (this.guestAccess && !this.user) {
//       userName = 'Guest';
//     } else if (this.user && this.user.profile) {
//       userName = this.user.profile[givenNameClaim];
//     }

//     return userName;
//   }

//   public getUserEmail(): string {
//     let emailaddress = '';
//     const emailAddressClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

//     if (this.user && this.user.profile) {
//       emailaddress = this.user.profile[emailAddressClaim];
//     }

//     return emailaddress;
//   }

//   public getUserReference(): string {
//     if (this.user && this.user.profile) {
//       return this.user.profile.UserRef;
//     } else {
//       return null;
//     }
//   }

//   public getAuthorizationHeaderValue(): string {
//     if (this.user && !this.user.expired) {
//       return `${this.user.token_type} ${this.user.access_token}`;
//     } else {
//       return null;
//     }
//   }

//   public silentAuthentication(stateUrl: string): Promise<void> {
//     if (!this.hasSilentSignInCalled) {
//       this.hasSilentSignInCalled = true;
//       return new Promise((resolve) => {
//         this.ngZone.runOutsideAngular(async () => {
//           this.manager.signinSilent().then((user) => {
//             this.afterAuthentication(user, stateUrl, resolve);
//           }).catch((exception) => {
//             this.guestAccess = true;
//             resolve();
//           });
//         });
//       });
//     }
//   }

//   public startAuthentication(stateUrl: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.ngZone.runOutsideAngular(async () => {
//         this.manager.signinSilent().then((user) => {
//           this.afterAuthentication(user, stateUrl, resolve);
//         }).catch((exception) => {
//           this.manager.signinPopup().then(user => {
//             this.afterAuthentication(user, stateUrl, resolve);
//           }).catch((error) => {
//             error.message = `Error in startAuthentication. Error message : ${error.message}`;
//             this.loggerService.logException(error);
//             reject();
//           });
//         });
//       });
//     });
//   }

//   public async completeAuthentication(): Promise<void> {
//     try {
//       await this.manager.signinSilentCallback();
//       await this.manager.signinPopupCallback();
//     } catch (error) {
//       error.message = `Error in completeAuthentication. Error message : ${error.message}`;
//       this.loggerService.logException(error);
//     }
//   }

//   public logout(): Promise<void> {
//     this.isUserLoggedOut = true;
//     this.featurePermissions = [];
//     this.sessionService.resetSessionId();
//     return new Promise((resolve) => {
//       this.manager.removeUser().then(() => {
//         window.location.replace(`${this.clientSettings.authority}account/logoff?clientid=${this.clientSettings.client_id}`);
//         resolve();
//       }).catch(error => {
//         error.message = `Error in logout. Error message : ${error.message}`;
//         this.loggerService.logException(error);
//         resolve();
//       });
//     });
//   }

//   public hasPermission(permissionsToCheck: string): boolean {
//     return this.featurePermissions.indexOf(permissionsToCheck) > -1;
//   }

//   private loadFeaturePermissionsFromUM(): Promise<boolean> {
//     return new Promise((resolve) => {
//       const auhtorizationHeader = this.getAuthorizationHeaderValue();
//       if (auhtorizationHeader) {
//         const headers = new HttpHeaders({ 'Authorization': auhtorizationHeader });
//         this.httpClient.post(environment.URLConstant.UM_Claims_Url, null, { headers: headers })
//           .subscribe(result => {
//             if (result && result['Data']) {
//               result['Data'].forEach((element: { ClaimType: string; ClaimValue: string; }) => {
//                 if (element.ClaimType === 'Permissions') {
//                   if (this.featurePermissions.indexOf(element.ClaimValue) === -1) {
//                     this.featurePermissions.push(element.ClaimValue);
//                   }
//                 }
//               });
//             }
//             resolve(true);
//           }, error => {
//             error.message = `Error in loadFeaturePermissionsFromUM. Error message : ${error.message}`;
//             this.loggerService.logException(error);
//             this.logout();
//           });
//       } else {
//         resolve(false);
//       }
//     });
//   }

//   private afterAuthentication(user: User, stateUrl: string, resolve): void {
//     this.user = user;

//     if (this.guestAccess || !this.user) {
//       this.guestAccess = false;
//     } else {
//       this.guestAccess = true;
//     }

//     this.resetUserPermissions().then(() => {
//       // if stateURL is null then stay on the current page
//       if (stateUrl) {
//         this.ngZone.run(() => this.router.navigateByUrl(stateUrl));
//       }
//       resolve();
//     });
//   }

//   private resetUserPermissions(): Promise<void> {

//     this.featurePermissions = [];
//     const promises = []; // array to keep all promises that need to be fulfilled

//     if (this.guestAccess) {
//       this.loadGuestUserPermissions();
//     } else {
//       promises.push(this.loadFeaturePermissionsFromUM());
//     }

//     // load AB Test permissions
//     promises.push(this.loadABTestingScenarioPermissions());
//     promises.push(this.userPreferenceService.init(this.getUserReference()));
//     return Promise.all(promises).then(() => {
//       this.loadBetaProgramPermissions();
//     });
//   }

//   private loadBetaProgramPermissions(): void {
//     const betaPermissionProvider: BetaProgramPermissionProvider = new BetaProgramPermissionProvider();

//     const betaPermissions = betaPermissionProvider.getBetaProgramPermissions(this.featurePermissions);

//     this.checkForPermission(betaPermissions);
//   }

//   private checkForPermission(permissionsList): void {
//     if (permissionsList && permissionsList.length > 0) {
//       permissionsList.forEach((appPermission) => {
//         if (this.featurePermissions.indexOf(appPermission) === -1) {
//           this.featurePermissions.push(appPermission);
//         }
//       });
//     }
//   }

//   private loadGuestUserPermissions(): void {
//     this.checkForPermission(GuestAccessPermissions.Permissions);
//   }

//   private loadABTestingScenarioPermissions(): Promise<void> {
//     return this.abTestScenarioService.getABTestScenarioPermissionsForUser(this.getUserReference()).then((abPermissions) => {
//       this.checkForPermission(abPermissions);
//     });
//   }

//   private refreshToken() {
//     this.ngZone.runOutsideAngular(async () => {
//       this.manager.signinSilent({ client_secret: this.clientSettings.client_secret }).then((user) => { this.user = user; });
//     });
//   }

//   // TODO refactor this to load guest vs non-guest features into the same array
//   // used everywhere else
//   public canAccessFeature(featureName: string): boolean {
//     if (this.guestAccess) {
//       if (Object.values(Enums.FeatureList).find(value => value === featureName)) {
//         return false;
//       }
//     }
//     return true;
//   }
// }
