
import { RsaService } from './../shared/helper/rsaservice';
import { DataCommunicateService } from './../services/data-communicate.service';
import { Router } from '@angular/router';
import { LoaderService } from './../services/shared/loader';
import { AuthenticateService } from './../services/auth/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { GoogleLoginProvider } from 'angular5-social-login';
import { Token } from '../shared/usertoken';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastMessage } from '../shared/toast-message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userSocialLogin = { email: "", name: "", provider: "", facebookImage: "", facebookId: "", googleImage: "", googleId: "", password: "" }
  public login: FormGroup;
  public errorMessage: string = "";
  private userSesssion = new Token();
  public email: AbstractControl;
  public password: AbstractControl;
  // public _retypePassword: string;


  toastConfig = this.toastMessage.toastConfig;

  constructor(private socialAuthService: AuthService,
    private autherization: AuthenticateService, private loadSpinner: LoaderService
    , private router: Router,
    private fb: FormBuilder
    , private dataService: DataCommunicateService, private rsaService: RsaService
    , private toastMessage: ToastMessage
  ) {

  }
  ngOnInit() {
    this.login = this.fb.group({
      'email': ['', Validators.compose([Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.password = this.login.controls['password'];
    this.email = this.login.controls['email'];
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
        this.userSocialLogin.provider = userData.provider;
        if (socialPlatform == "facebook") {
          this.userSocialLogin.facebookId = userData.id;
          this.userSocialLogin.facebookImage = userData.image;
        }
        else if (socialPlatform == "google") {
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
          this.userSocialLogin.googleId = userData.id;
          this.userSocialLogin.googleImage = userData.image;
        }
        this.autherization.doRegistration(this.userSocialLogin).subscribe(data => {
          if (data.status == "success") {

            this.userSesssion.access_token = data.token;
            this.userSesssion.name = data.name;
            this.userSesssion.email = data.email;
            this.userSesssion.userId = data.id;

            this.userSesssion.cDate = data.cDate;
            this.userSesssion.city = data.city;
            this.userSesssion.state = data.state;
            this.userSesssion.country = data.country;
            this.userSesssion.phone = data.phone;
            this.userSesssion.birthDate = data.birthDate;
            this.userSesssion.pinCode = data.pinCode;
            this.userSesssion.about = data.about;
            this.userSesssion.profession = data.profession;
            this.userSesssion.exeperience = data.exeperience;
            this.userSesssion.skill = data.skill;
            this.userSesssion.galary = data.galary;
            this.userSesssion.currentProvider = socialPlatform;
            this.userSesssion.socialId = userData.id;
            this.userSesssion.image = this.userSesssion.currentProvider == 'google' ? data.googleImage : data.facebookImage;
            localStorage.setItem("session", this.rsaService.encrypt(JSON.stringify(this.userSesssion)));
            this.loadSpinner.display(false);
            window.open('/home/dashboard', '_self');

          }
          else {
            console.log("Error");

            this.loadSpinner.display(false);
          }
        });

      }
    );
  }

  // public register() {
  //   this.loadSpinner.display(true);
  //   this.userSocialLogin.email = this.email.value;
  //   this.userSocialLogin.password = this.password.value;

  //   this.autherization.doRegistration(this.userSocialLogin).subscribe(data => {
  //     if (data.status == "success") {
  //       this.loadSpinner.display(false);
  //     }
  //     else {
  //       this.errorMessage = data.msg;
  //       this.loadSpinner.display(false);
  //     }
  //   });
  // }

  appLogin() {
    this.validateAllFormFields(this.login);
    if (this.login.valid) {
      this.autherization.login(this.login.value).subscribe(data => {
        if (data.status == "success") {
          this.userSesssion.access_token = data.token;
          this.userSesssion.name = data.name;
          this.userSesssion.email = data.email;
          this.userSesssion.userId = data.id;
          this.userSesssion.cDate = data.cDate;
          this.userSesssion.city = data.city;
          this.userSesssion.state = data.state;
          this.userSesssion.country = data.country;
          this.userSesssion.phone = data.phone;
          this.userSesssion.birthDate = data.birthDate;
          this.userSesssion.pinCode = data.pinCode;
          this.userSesssion.about = data.about;
          this.userSesssion.profession = data.profession;
          this.userSesssion.exeperience = data.exeperience;
          this.userSesssion.skill = data.skill;
          this.userSesssion.galary = data.galary;
          localStorage.setItem("session", this.rsaService.encrypt(JSON.stringify(this.userSesssion)));
          this.loadSpinner.display(false);
          this.toastMessage.popSuccess("Successfully Loged In.", "Loged in successfully", true);
          window.open('/home/dashboard', '_self');
        }
        else {
          this.toastMessage.popError("Error", data.msg, true);
          this.loadSpinner.display(false);
        }
      }, error => {
        this.toastMessage.popError("Error", error, true);
      }
      )
    }
    else {
      this.toastMessage.popError("Error", "Invalid Login credential!", true);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }


}
