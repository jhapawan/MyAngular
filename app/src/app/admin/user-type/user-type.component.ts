import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {


  // User Type Form Declartion
  userType: AbstractControl;
  isActive: AbstractControl;
  roleMenu: AbstractControl;
  public pgUserType: FormGroup;
  //End of Form Declartion
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.generateForm("");
  }
  generateForm(arg0: any): any {
    this.pgUserType = this.fb.group({
      'userType': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'isActive': ['', Validators.compose([Validators.required])],
      'roleMenu': ['', Validators.compose([Validators.required])]
    })
    this.userType = this.pgUserType.controls["userType"];
    this.isActive = this.pgUserType.controls["isActive"];
    this.roleMenu = this.pgUserType.controls["roleMenu"];
  }


}
