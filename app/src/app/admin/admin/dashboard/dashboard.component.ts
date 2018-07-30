import { RsaService } from './../../../shared/helper/rsaservice';
import { SearchFilterPipe } from './../../../shared/search-filter.pipe';
import { Token } from './../../../shared/usertoken';
import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { UserServiceService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  , animations: [
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
export class DashboardComponent implements OnInit {

  public userSession: Token = JSON.parse(this.rsa.decrypt(localStorage.getItem("session")));
  public relatedPack: Array<any> = [];
  public filtredPack: Array<any> = [];
  public searchValue: string = "";
  constructor(private api: UserServiceService, private rsa: RsaService) { }

  ngOnInit() {
    
  }
  getFiltredPacked(arg0: any): any {
    if (this.relatedPack) {
      var filteredArray = this.relatedPack.filter(function (array_el) {
        if (array_el.skill) {
          return array_el.skill.filter(function (nestedFilter) {
            return arg0.filter(function (argumented) {
              return nestedFilter.skill == argumented.skill;
            })
          })
        }
      });
      this.filtredPack = filteredArray;
    }
  }
  getAllPackUser() {
    this.api.geAllPack().subscribe(
      res => {
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
  calculateProfilePercentage() {
    let total = 0.0;
    if (this.userSession.city) total += 3;
    if (this.userSession.state) total += 3;
    if (this.userSession.country) total += 3;
    if (this.userSession.phone) total += 3;
    if (this.userSession.birthDate) total += 3;
    if (this.userSession.about) total += 3;
    if (this.userSession.profession) total += 3;
    if (this.userSession.lastName) total += 3;
    if (this.userSession.name) total += 3;
    if (this.userSession.email) total += 3;
    if (this.userSession.skill) total += 10;
    if (this.userSession.education) total += 20;
    if (this.userSession.exeperience) total += 20;
    return total;
  }

}
