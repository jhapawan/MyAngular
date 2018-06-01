import { DataCommunicateService } from './../services/data-communicate.service';
import { Router } from '@angular/router';

import { LoaderService } from './../services/shared/loader';
import { AuthenticateService } from './../services/auth/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { GoogleLoginProvider } from 'angular5-social-login';

import { Token } from '../shared/usertoken';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userSocialLogin = { email: "", name: "", provider: "", image: "", id: "", password: "" }

  public loginpage: FormGroup;
  public submitted: boolean = false;

  /*Declare Form Object */
  public email: AbstractControl;
  public password: AbstractControl;
  public reTypePassword: AbstractControl;
  public errorMessage: string = "";
  private userSesssion = new Token();
  public _retypePassword: string;
  constructor(private socialAuthService: AuthService,
    private autherization: AuthenticateService, private loadSpinner: LoaderService
    , private router: Router,
    private fb: FormBuilder
    , private dataService: DataCommunicateService
  ) {
    // this.toasterService.pop('success', 'Args Title', 'Args Body');
  }
  ngOnInit() {
    this.loginpage = this.fb.group({
      'email': ['', Validators.compose([Validators.email, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'reTypePassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.password = this.loginpage.controls['password'];
    this.email = this.loginpage.controls['email'];
    this.reTypePassword = this.loginpage.controls['reTypePassword'];
  }
  public socialSignIn(socialPlatform: string) {

    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.loadSpinner.display(true);
        this.userSocialLogin.email = userData.email;
        this.userSocialLogin.name = userData.name;
        this.userSocialLogin.id = userData.id;
        this.userSocialLogin.provider = userData.provider;
        this.userSocialLogin.image = userData.image;
        this.autherization.doRegistration(this.userSocialLogin).subscribe(data => {
          if (data.status == "success") {
            this.userSesssion.access_token = data.token;
            this.userSesssion.name = data.name;
            this.userSesssion.email = data.email;
            this.userSesssion.userId = data.id;
            this.userSesssion.image = data.image;
            this.userSesssion.cDate = data.cDate;
            localStorage.setItem("session", JSON.stringify(this.userSesssion));
            this.loadSpinner.display(false);
            window.open('/admin/add-user', '_self');
          }
          else {
            console.log("Error");
            this.loadSpinner.display(false);
          }
        });

      }
    );
  }
  public register() {
    this.loadSpinner.display(true);
    this.userSocialLogin.email = this.email.value;
    this.userSocialLogin.password = this.password.value;

    this.autherization.doRegistration(this.userSocialLogin).subscribe(data => {
      if (data.status == "success") {
        this.loadSpinner.display(false);
      }
      else {
        this.errorMessage = data.msg;
        this.loadSpinner.display(false);
      }
    });
  }
}
