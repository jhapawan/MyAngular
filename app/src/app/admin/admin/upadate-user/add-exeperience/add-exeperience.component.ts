import { UserModel } from './../../../../shared/model/user';
import { UserServiceService } from './../../../../services/user/user-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-exeperience',
  templateUrl: './add-exeperience.component.html',
  styleUrls: ['./add-exeperience.component.css']
})
export class AddExeperienceComponent implements OnInit {

  addExeperienceForm: FormGroup;
  from: AbstractControl;
  to: AbstractControl;
  designation: AbstractControl;
  isCurrentOrganisation: AbstractControl;
  companyName: AbstractControl;
  roleResponsibility: AbstractControl;
  gid: AbstractControl;
  isCurrentOrg: boolean;
  @Input() userData: UserModel;
  @Output() getExeperience = new EventEmitter();
  constructor(private fb: FormBuilder, private api: UserServiceService) { }

  ngOnInit() {
    this.createNewExeperience();
  }
  createNewExeperience(): any {
    this.addExeperienceForm = this.fb.group(
      {
        'from': [, Validators.compose([Validators.required])],
        'to': [, Validators.compose([Validators.required])],
        'designation': [, Validators.compose([Validators.required])],
        'isCurrentOrganisation': [, Validators.compose([])],
        'companyName': [, Validators.compose([Validators.required])],
        'roleResponsibility': [, Validators.compose([Validators.required])],
        'gid': [this.userData._id, Validators.compose([])],
      }

    );
    this.from = this.addExeperienceForm.controls['from'];
    this.to = this.addExeperienceForm.controls['to'];
    this.isCurrentOrganisation = this.addExeperienceForm.controls['isCurrentOrganisation'];
    this.companyName = this.addExeperienceForm.controls['companyName'];
    this.roleResponsibility = this.addExeperienceForm.controls['roleResponsibility'];
    this.designation = this.addExeperienceForm.controls['designation'];
    this.gid = this.addExeperienceForm.controls['gid'];
  }

  addExeperience() {
    this.gid.setValue(this.userData._id)
    if (this.addExeperienceForm.valid) {
      this.api.addExeperience(this.addExeperienceForm.value).subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          this.getExeperience.emit(true);
        }
      }, Error => { console.log(Error) })
    }
    else { this.validateAllFormFields(this.addExeperienceForm); }
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
  isCurrentEmployeer() {
    
  }
}
