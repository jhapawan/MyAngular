import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel } from '../../../../shared/model/user';
import { UserServiceService } from '../../../../services/user/user-service.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  addEducationForm: FormGroup;
  instituteName: AbstractControl;
  yearOfPassing: AbstractControl;
  classStartFrom: AbstractControl;
  classStartTo: AbstractControl;
  nameOfPersuingClass: AbstractControl;

  gid: AbstractControl;

  isCurrentOrg: boolean;


  @Input() userData: UserModel;
  @Output() getEducation = new EventEmitter();

  yearRange: Array<any> = [];
  constructor(private fb: FormBuilder, private api: UserServiceService) { }


  ngOnInit() {
    this.createNewExeperience();
    let year = new Date().getFullYear();
    for (var i = 1; i < 50; i++) {
      this.yearRange.push(year - i);
    }
  }
  createNewExeperience(): any {
    this.addEducationForm = this.fb.group(
      {
        'instituteName': [, Validators.compose([Validators.required])],
        'classStartFrom': [, Validators.compose([Validators.required])],
        'classStartTo': [, Validators.compose([Validators.required])],
        'nameOfPersuingClass': [, Validators.compose([Validators.required])],
        'gid': [this.userData._id, Validators.compose([])],
      }

    );
    this.instituteName = this.addEducationForm.controls['instituteName'];
    this.classStartFrom = this.addEducationForm.controls['classStartFrom'];
    this.classStartTo = this.addEducationForm.controls['classStartTo'];
    this.nameOfPersuingClass = this.addEducationForm.controls['nameOfPersuingClass'];
    this.gid = this.addEducationForm.controls['gid'];
  }
  addEducation() {
    this.gid.setValue(this.userData._id)
    if (this.addEducationForm.valid) {
      this.api.addEducation(this.addEducationForm.value).subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          this.getEducation.emit(true);
        }
      }, Error => { console.log(Error) })
    }
    else { this.validateAllFormFields(this.addEducationForm); }

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
