import { RsaService } from './../../shared/helper/rsaservice';
import { Token } from './../../shared/usertoken';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { GoogleLoginProvider } from 'angular5-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  constructor(private rsa: RsaService, private socialAuthService: AuthService) { }

  ngOnInit() {

  }
  signOut() {
    let socialPlatformProvider;
    if (this.userSession.currentProvider == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    console.log(socialPlatformProvider);
    this.socialAuthService.signIn(socialPlatformProvider).then(
      signIn => {
        this.socialAuthService.authState.subscribe(x => {
          this.socialAuthService.signOut().then(logout => {
            window.open('/login', '_self');
          }).catch(error => console.log(error));
        });
      }
    );

  }

}
