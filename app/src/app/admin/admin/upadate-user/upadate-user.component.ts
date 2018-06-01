import { UserModel } from './../../../shared/model/user';
import { UserServiceService } from './../../../services/user/user-service.service';
import { Token } from './../../../shared/usertoken';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, trigger, state, transition, style, group, animate } from '@angular/core';

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

  public userSession: Token = JSON.parse(localStorage.getItem("session"));
  paramId: any;
  requestModeView: boolean = false;
  userData: UserModel = new UserModel();
  isEditAbout: boolean = false;
  constructor(private route: ActivatedRoute, private api: UserServiceService) {
    this.route.params.subscribe(params => { this.paramId = params.id; });
  }
  ngOnInit() {
    console.log(this.userSession);
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
      },
      Error => { console.log(Error) }
    )
  }
  editAbout() {
    this.isEditAbout = !this.isEditAbout;
  }
  updateProfile(value) {
    this.isEditAbout = !this.isEditAbout;
    this.getUserData();
  }

}
