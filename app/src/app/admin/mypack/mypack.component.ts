import { Token } from './../../shared/usertoken';
import { RsaService } from './../../shared/helper/rsaservice';
import { UserServiceService } from './../../services/user/user-service.service';
import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

@Component({
  selector: 'app-mypack',
  templateUrl: './mypack.component.html',
  styleUrls: ['./mypack.component.css'],
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
export class MypackComponent implements OnInit {
  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  public relatedPack: Array<any> = [];
  public filtredPack: Array<any> = [];
  public searchValue: string = "";


  constructor(private api: UserServiceService, private rsa: RsaService) {
    //this.relatedPack = this.userSession.skill;
  }

  ngOnInit() {
    this.getAllPackUser();
  }
  getFiltredPacked(arg0: any): any {
    if (arg0) {
      if (this.relatedPack) {
        var filteredArray = this.relatedPack.filter(function (array_el) {
          if (array_el.skill) {
            return array_el.skill.filter(function (nestedFilter) {
              return arg0.filter(function (argumented) {
                return (nestedFilter.skill == argumented.skill);
              })
            })
          }
        });
        this.filtredPack =  this.relatedPack;
        console.log(filteredArray);
      }
    }
  }
  getAllPackUser() {
    this.api.geAllPack().subscribe(
      res => {
        console.log(res);
        this.relatedPack = res.resultArr;
        this.getFiltredPacked(this.userSession.skill);
      }
    )
  }
  createRowRange() {
    var items: number[] = [];
    let row = Math.ceil(this.filtredPack.length / 3);
    for (var i = 1; i <= row; i++) {
      items.push(i);
    }
    return items;
  }
  createColumnRange() {
    var items: number[] = [];
    let column = 3;
    for (var i = 1; i <= column; i++) {
      items.push(i);
    }
    return items;
  }

}

