import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, LogLevel, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://topnotchprod.b2clogin.com/topnotchprod.onmicrosoft.com/B2C_1_susi_social_idp/v2.0',
      authWellknownEndpoint:
        'https://topnotchprod.b2clogin.com/topnotchprod.onmicrosoft.com/B2C_1_susi_social_idp/v2.0/.well-known/openid-configuration',
      redirectUrl: "http://localhost:4200",
      postLogoutRedirectUri: "http://localhost:4200",
      clientId: 'c53d58ef-169e-4d9e-aaa6-3b76e53c069a',
      scope: 'openid profile https://topnotchprod.onmicrosoft.com/backend-function-id/FullAccess',
      responseType: 'code',
      silentRenew: true,
      autoUserinfo: false,
      silentRenewUrl: "http://localhost:4200",
      renewTimeBeforeTokenExpiresInSeconds: 60,
      // useRefreshToken: true, // for refresh renew, but revocation and one time usage is missing from server impl.
      // ignoreNonceAfterRefresh: true,
      // disableRefreshIdTokenAuthTimeValidation: true,
    });
}

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
