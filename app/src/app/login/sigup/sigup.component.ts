import { RsaService } from './../../shared/helper/rsaservice';
import { Router } from '@angular/router';
import { LoaderService } from './../../services/shared/loader';
import { AuthenticateService } from './../../services/auth/authenticate.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {
  public signUp: FormGroup;
  public submitted: boolean = false;

  /* Variable declared to be used for further */
  errorMessage: string = '';
  successMessage: string = '';
  /*Declare Form Object */
  public email: AbstractControl;
  public password: AbstractControl;
  public reTypePassword: AbstractControl;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public birthDate: AbstractControl;


  constructor(private autherization: AuthenticateService, private loadSpinner: LoaderService
    , private router: Router,
    private fb: FormBuilder
    , private rsaService: RsaService
  ) { }

  ngOnInit() {
    this.signUp = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': ['', Validators.compose([Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'reTypePassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'birthDate': ['', Validators.compose([Validators.required])]

    }, this.pwdMatchValidator);
    this.password = this.signUp.controls['password'];
    this.email = this.signUp.controls['email'];
    this.reTypePassword = this.signUp.controls['reTypePassword'];
    this.firstName = this.signUp.controls['firstName'];
    this.lastName = this.signUp.controls['lastName'];
    this.birthDate = this.signUp.controls['birthDate'];
  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('reTypePassword').value
      ? null : { 'mismatch': true };
  }
  public register() {
    this.validateAllFormFields(this.signUp);
    if (this.signUp.valid) {
      this.loadSpinner.display(true);
      this.errorMessage = "";
      this.successMessage = "";
      this.autherization.doRegistration(this.signUp.value).subscribe(data => {
        console.log(data);
        if (data.status == "success") {
          this.loadSpinner.display(false);
          this.successMessage = data.msg;
        }
        else {
          this.errorMessage = data.msg;
          this.loadSpinner.display(false);
        }
      });
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
