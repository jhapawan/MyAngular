import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../../shared/model/user';

@Component({
  selector: 'app-load-galary',
  templateUrl: './load-galary.component.html',
  styleUrls: ['./load-galary.component.css']
})
export class LoadGalaryComponent implements OnInit, OnChanges {
  @Input() userData: UserModel;
  imageSrc: any[] = [];
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("Ng On Change");
    const name: SimpleChange = changes.name;
    for (let propName in changes) {
      let change = changes[propName];
      let curVal = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;
      if (propName === 'userData') {
        if (curVal != undefined) {
          this.userData = change.currentValue;
          this.imageSrc = this.userData.galary;
          this.ref.detectChanges();
          // this.firstName.setValue(this.userData.name);
          // this.lastName.setValue(this.userData.lastName);
          // this.email.setValue(this.userData.email);
          // this.birthDate.setValue(this.userData.birthDate);
          // this.city.setValue(this.userData.city);
          // this.country.setValue(this.userData.country);
          // this.state.setValue(this.userData.state);
        }
      }
    }
  }
  createRowRange() {
    var items: number[] = [];
    let row = Math.ceil(this.imageSrc.length / 3);
    for (var i = 1; i <= row; i++) {
      items.push(i);
    }
    return items;
  }

}
