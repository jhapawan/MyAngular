import { Token } from './../../shared/usertoken';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userSession: Token = JSON.parse(localStorage.getItem("session"));
  constructor() { }

  ngOnInit() {

  }

}
