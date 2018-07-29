import { Component, OnInit, OnChanges } from '@angular/core';
import { Token } from '../../../shared/usertoken';
import { RsaService } from '../../../shared/helper/rsaservice';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile-left',
  templateUrl: './profile-left.component.html',
  styleUrls: ['./profile-left.component.css']
})
export class ProfileLeftComponent implements OnInit, OnChanges {
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  activeRoute: string = "about";
  constructor(private rsa: RsaService, private aRout: ActivatedRoute) {
  }


  ngOnInit() {
    this.activeRoute = this.aRout.snapshot.firstChild.url[0].path;
  }
  ngOnChanges() {
    this.activeRoute = this.aRout.snapshot.firstChild.url[0].path;
  }

}
