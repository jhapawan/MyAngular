import { Token } from './../../../shared/usertoken';
import { RsaService } from './../../../shared/helper/rsaservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftcontent',
  templateUrl: './leftcontent.component.html',
  styleUrls: ['./leftcontent.component.css']
})
export class LeftcontentComponent implements OnInit {
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  constructor(private rsa: RsaService) { }


  ngOnInit() {
  }

}
