import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../shared/model/user';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../services/user/user-service.service';
import { RsaService } from '../../../shared/helper/rsaservice';
import { Token } from '../../../shared/usertoken';
import { ToastMessage } from '../../../shared/toast-message';

@Component({
  selector: 'app-about-profile',
  templateUrl: './about-profile.component.html',
  styleUrls: ['./about-profile.component.css']
})
export class AboutProfileComponent implements OnInit {
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
  loadPageData: boolean = false;
  toastConfig = this.toastMessage.toastConfig;
  constructor(private route: ActivatedRoute, private api: UserServiceService,
    private rsa: RsaService, private toastMessage: ToastMessage) {
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
  updateProfile(value) {
    this.isEditAbout = !this.isEditAbout;
    this.getUserData();
    this.loadPageData = true;
    //this.toastMessage.popSuccess("Success", "Details updated successfully!", true);
  }
}
