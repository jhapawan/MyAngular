import { RsaService } from './../../shared/helper/rsaservice';
import { Component, OnInit } from '@angular/core';
import { Token } from '../../shared/usertoken';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  
  constructor(private rsa: RsaService) { }
  ngOnInit() {
  }

}
