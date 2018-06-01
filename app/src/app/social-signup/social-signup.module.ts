import { appConfig } from './../shared/config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(appConfig.faceBookClientId)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(appConfig.googleClientId)
      },
    ]);
  return config;
}
@NgModule({
  imports: [
    CommonModule, SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  declarations: []
})
export class SocialSignupModule { }
