import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../../../shared/model/user';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '../../../../services/user/user-service.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  @Input() userData: UserModel;
  @Output() updateSkill = new EventEmitter();
  addSkill: FormGroup;
  skill: AbstractControl;
  proficiencyLevel: AbstractControl;
  version: AbstractControl;
  lastUsed: AbstractControl;
  gid: AbstractControl;
  constructor(private fb: FormBuilder, private api: UserServiceService) { }
  ngOnInit() {
    this.createForm();
  }
  createForm(): any {
    this.addSkill = this.fb.group(
      {
        'skill': [, Validators.compose([Validators.required])],
        'proficiencyLevel': [, Validators.compose([Validators.required, Validators.max(100)])],
        'version': [, Validators.compose([Validators.required])],
        'lastUsed': [, Validators.compose([])],
        'gid': [this.userData._id, Validators.compose([])],
      }

    );
    this.skill = this.addSkill.controls['skill'];
    this.proficiencyLevel = this.addSkill.controls['proficiencyLevel'];
    this.version = this.addSkill.controls['version'];
    this.lastUsed = this.addSkill.controls['lastUsed'];
    this.gid = this.addSkill.controls['gid'];
  }
  addSkills() {
    this.gid.setValue(this.userData._id)
    if (this.addSkill.valid) {
      this.api.addSkill(this.addSkill.value).subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          this.updateSkill.emit(true);
        }
      }, Error => { console.log(Error) })
    }
    else { this.validateAllFormFields(this.addSkill); }

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
