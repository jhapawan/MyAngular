import { RsaService } from './../../../shared/helper/rsaservice';
import { Token } from './../../../shared/usertoken';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() profileData: any;
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  constructor(private rsa: RsaService) { }

  ngOnInit() {

  }

}
