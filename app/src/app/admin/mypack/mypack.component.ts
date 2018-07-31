import { element } from 'protractor';
import { ExampleValues_Frameworks } from './../../shared/selectize/selectize';
import { CommonService } from './../../services/shared/common.service';
import { Token } from './../../shared/usertoken';
import { RsaService } from './../../shared/helper/rsaservice';
import { UserServiceService } from './../../services/user/user-service.service';
import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

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
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];
  constructor(private api: UserServiceService, private rsa: RsaService, private commonApi: CommonService) {
    this.LoadCountry();
  }
  ngOnInit() {
    this.getAllPackUser();
    this.userSession.skill.forEach(element => {
      this.value.push(element.skill);
    });

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
  LoadCountry(): any {
    this.commonApi.getCountries().subscribe(res => {
      this.states = res.data;

    }, Error => {
      console.log(Error);
    });
  }
  updateFilterData(data, i): void {
    if (i === 0) {
      this.relatedPack = [];
    }
    else {
      this.filtredPack.push(data);
    }
  }

}

