import { element } from 'protractor';
import { ExampleValues_Frameworks } from './../../shared/selectize/selectize';
import { CommonService } from './../../services/shared/common.service';
import { Token } from './../../shared/usertoken';
import { RsaService } from './../../shared/helper/rsaservice';
import { UserServiceService } from './../../services/user/user-service.service';
import { Component, OnInit, trigger, transition, style, animate, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

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
  private pageSize = 6;
  private pageNo = 1;
  selected: string;
  query: "";
  requiredDropdownOptions: any = ExampleValues_Frameworks.slice(0);
  config: any = {
    create: true,
    labelField: 'label',
    valueField: 'value',
    maxItems: 50,
    searchField: ['label', 'value'],
  };

  value: any = [];

  currentPage = 1;
  page: number;

  constructor(private api: UserServiceService, private rsa: RsaService, private commonApi: CommonService, private rcd: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.getAllPackUser();
    // this.userSession.skill.forEach(element => {
    //   this.value.push(element.skill);
    // });


  }
  getFiltredPacked(arg0: any): any {
    let arr: Array<Token> = [];
    if (arg0) {

      if (this.relatedPack) {
        var filteredArray = this.relatedPack.filter(function (array_el) {
          if (array_el.skill) {
            return array_el.skill.filter(function (nestedFilter) {
              return arg0.filter(function (argumented) {
                //return (nestedFilter.skill == argumented.skill);
                if (nestedFilter.skill == argumented.skill) {
                  arr.push(array_el);
                }
              })
            })
          }
        });
        this.filtredPack = arr;
      }
    }
  }
  getAllPackUser() {
    this.api.geAllPack().subscribe(
      res => {
        this.relatedPack = res.resultArr;
        //this.getFiltredPacked(this.userSession.skill);        
        this.filtredPack = this.Paginator(this.relatedPack, this.pageNo, this.pageSize).data;
      }
    )
  }
  // createRowRange() {
  //   var items: number[] = [];
  //   let row = Math.ceil(this.relatedPack.length / 3);
  //   for (var i = 1; i <= row; i++) {
  //     items.push(i);
  //   }
  //   return items;
  // }
  // createColumnRange() {
  //   var items: number[] = [];
  //   let column = 3;
  //   for (var i = 1; i <= column; i++) {
  //     items.push(i);
  //   }
  //   return items;
  // }

  pageChanged(event: any): void {
    this.page = event.page;
    this.filtredPack = this.Paginator(this.relatedPack, this.page, this.pageSize).data;
  }
  Paginator(items, page, per_page) {
    var page = page || 1,
      per_page = per_page || 10,
      offset = (page - 1) * per_page,

      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }
  onChange() {
    this.currentPage = 1;
  }
}

