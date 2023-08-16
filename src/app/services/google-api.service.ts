import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


const oAuthConfig: AuthConfig={
  issuer:'https://accounts.google.com',
  strictDiscoveryDocumentValidation:false,
  redirectUri:window.location.origin,
  clientId:'724031816282-kim5350ehu2mt4qa9mfb0h0dqc00glvj.apps.googleusercontent.com',
  scope:'openid profile email'
}

@Injectable({
  providedIn: 'root'
})



export class GoogleApiService {

  constructor(private readonly oAauthService: OAuthService) {
    oAauthService.configure(oAuthConfig)
    oAauthService.loadDiscoveryDocument().then(()=>{
      oAauthService.tryLoginImplicitFlow().then(() =>{
        if(!oAauthService.hasValidAccessToken()){
          oAauthService.initLoginFlow()
        }else{
          oAauthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile)) 
          })
        }
      })
    })
   }
}
