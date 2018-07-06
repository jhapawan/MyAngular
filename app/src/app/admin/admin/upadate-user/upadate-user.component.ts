import { RsaService } from './../../../shared/helper/rsaservice';
import { UserModel } from './../../../shared/model/user';
import { UserServiceService } from './../../../services/user/user-service.service';
import { Token } from './../../../shared/usertoken';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, trigger, state, transition, style, group, animate, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-upadate-user',
  templateUrl: './upadate-user.component.html',
  styleUrls: ['./upadate-user.component.css'],
  animations: [
    trigger('someCoolAnimation', [
      transition('* => fadeIn', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => fadeOut', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UpadateUserComponent implements OnInit {

  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));

  paramId: any;
  requestModeView: boolean = false;
  userData: UserModel = new UserModel();
  isEditAbout: boolean = false;
  isEditExpEdu: boolean = false;
  _EditExpEduText: string = "";
  loadEducation: boolean = false;
  changeDetectorRef: ChangeDetectorRef[] = [];
  editSkills: boolean = false;
  constructor(private route: ActivatedRoute, private api: UserServiceService, private rsa: RsaService) {
    this.route.params.subscribe(params => { this.paramId = params.id; });
  }
  ngOnInit() {
    if (this.paramId != this.userSession.userId) {
      //window.alert("Your are not authenticated user to access that page.");
    }
    if (this.route.routeConfig.path.search("edit") == -1) {
      this.requestModeView = true;
    }
    this.getUserData();

  }
  getUserData(): any {
    this.api.getUserById(this.paramId).subscribe(
      res => {
        this.userData = res.resultArr[0];
        this.userData.image = this.userSession.currentProvider == 'google' ? this.userData.googleImage : this.userData.facebookImage;
        this.updateSessionvalue(this.userData);

      },
      Error => { console.log(Error) }
    )
  }
  editAbout() {
    this.isEditAbout = !this.isEditAbout;
    if (this.isEditAbout) { this.isEditExpEdu = false; }
  }
  addExpOrEdu(sender) {
    this.isEditExpEdu = !this.isEditExpEdu;
    this.loadEducation = false;
    if (sender == 'exp') {
      this._EditExpEduText = "EXPERIENCE";
    } else { this._EditExpEduText = "EDUCATION"; this.loadEducation = true; }
    if (this.isEditExpEdu == false) { this._EditExpEduText = ""; }
    if (this.isEditExpEdu) { this.isEditAbout = false; }
  }
  updateProfile(value) {
    this.isEditAbout = !this.isEditAbout;
    this.getUserData();
  }
  updateExeperienc(value) {
    this.isEditExpEdu = !this.isEditExpEdu;
    this.getUserData();
  }
  removeData(data, deleteObject) {

    if (deleteObject === 'exp') {

      let dataExp: Array<any> = this.userData.exeperience;
      let indexOfObject = dataExp.indexOf(data);
      if (indexOfObject > -1) {
        dataExp.splice(indexOfObject, 1);
        this.userData.exeperience = dataExp;
      }
    } else if (deleteObject === 'edu') {
      let dataEdu: Array<any> = this.userData.education;
      let indexOfObject = dataEdu.indexOf(data);
      if (indexOfObject > -1) {
        dataEdu.splice(indexOfObject, 1);
        this.userData.education = dataEdu;
      }
    }
    else {
      let dataSkill: Array<any> = this.userData.skill;
      let indexOfObject = dataSkill.indexOf(data);
      if (indexOfObject > -1) {
        dataSkill.splice(indexOfObject, 1);
        this.userData.skill = dataSkill;
      }
    }
    this.api.updaetExeperienceEducation(this.userData).subscribe(
      x => { console.log(x); this.getUserData(); }
      , Error => { console.log(Error) }
    )

  }
  AddSkills() {
    this.editSkills = !this.editSkills;
  }
  updateSkill(value) {
    this.editSkills = !this.editSkills;
    this.getUserData();

  }
  updateSessionvalue(obj: UserModel) {
    this.userSession.lastName = obj.lastName
    this.userSession.phone = obj.phone
    this.userSession.birthDate = obj.birthDate
    this.userSession.city = obj.city
    this.userSession.country = obj.country
    this.userSession.state = obj.state
    this.userSession.pinCode = obj.pinCode
    this.userSession.about = obj.about
    this.userSession.profession = obj.profession
    this.userSession.exeperience = obj.exeperience
    this.userSession.education = obj.education
    this.userSession.skill = obj.skill
    this.userSession.galary = obj.galary
    localStorage.setItem("session", this.rsa.encrypt(JSON.stringify(this.userSession)));
  }
}
