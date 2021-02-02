// import { Injectable, OnDestroy, NgZone } from '@angular/core';
// import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

// import { AuthService } from './auth.service';
// import { Observable, Subscription } from 'rxjs';
// import { RouteConstant } from '../../shared/utilities/constants/route-constant';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService  implements CanActivate, OnDestroy {
//   private authenticationSubscription: Subscription;
//   private authorizationSubscription: Subscription;

//   constructor(private authService: AuthService, private router: Router,
//     private ngZone: NgZone) { }

//   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     const isLoggedIn = this.authService.isLoggedIn();
//     const isAuthorized = this.authService.isAuthorized();

//     this.authenticationSubscription =  isLoggedIn.subscribe((loggedin) => {
//         if (!loggedin) {
//             this.authService.startAuthentication(state.url);
//         } else {
//           this.authorizationSubscription = isAuthorized.subscribe((authorized) => {
//             if (!authorized) {
//               this.ngZone.run(() => this.router.navigateByUrl(RouteConstant.Route_Unauthorized));
//             }
//           });
//         }
//     });
//     return isLoggedIn && isAuthorized;
//   }

//   public ngOnDestroy() {
//     this.authenticationSubscription.unsubscribe();
//     this.authorizationSubscription.unsubscribe();
//   }
// }
