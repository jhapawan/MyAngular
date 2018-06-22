import { Component, OnInit } from '@angular/core';
import { Token } from '../../shared/usertoken';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public userSession: Token = JSON.parse(localStorage.getItem("session"));
  constructor() { }

  ngOnInit() {
  }

}
