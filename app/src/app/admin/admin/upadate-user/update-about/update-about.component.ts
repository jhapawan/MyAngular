import { UserServiceService } from './../../../../services/user/user-service.service';
import { Observable } from 'rxjs';
import { CommonService } from './../../../../services/shared/common.service';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel } from './../../../../shared/model/user';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap';
declare var google: any;
@Component({
  selector: 'app-update-about',
  templateUrl: './update-about.component.html',
  styleUrls: ['./update-about.component.css'],


})
export class UpdateAboutComponent implements OnChanges, OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @Input() userData: UserModel;
  @Output() profileUpdated = new EventEmitter();
  errorMessage: string;
  /*Form Declartion  */
  updateProfile: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  city: AbstractControl;
  state: AbstractControl;
  country: AbstractControl;
  birthDate: AbstractControl;
  phone: AbstractControl;
  pinCode: AbstractControl;
  about: AbstractControl;
  _id: AbstractControl;
  profession: AbstractControl;
  /* @param fb End of form declartion    */

  countryArray: any[];
  stateArray: any[];
  customSelected: string;
  stateCity: any[];

  constructor(private fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private api: CommonService, private useApi: UserServiceService) {
    this.LoadCountry();
  }

  ngOnInit() {
    console.log("Ng On init");
    this.generateForm();
    //this.loadMap();

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
  generateForm(): any {
    this.updateProfile = this.fb.group(
      {
        'firstName': [this.userData.name, Validators.compose([])],
        '_id': [this.userData._id, Validators.compose([])],
        'lastName': [this.userData.lastName, Validators.compose([])],
        'email': [this.userData.email, Validators.compose([Validators.email])],
        'city': [this.userData.city, Validators.compose([Validators.required])],
        'state': [this.userData.state, Validators.compose([Validators.required])],
        'country': [this.userData.country, Validators.compose([Validators.required])],
        'phone': [this.userData.phone, Validators.compose([Validators.required])],
        'birthDate': [this.userData.birthDate, Validators.compose([Validators.required])],
        'pinCode': [this.userData.phone, Validators.compose([Validators.required])],
        'about': [this.userData.about, Validators.compose([Validators.required])],
        'profession': [this.userData.profession, Validators.compose([Validators.required])],

      })
    this.firstName = this.updateProfile.controls['firstName'];
    this.lastName = this.updateProfile.controls['lastName'];
    this.email = this.updateProfile.controls['email'];
    this.city = this.updateProfile.controls['city'];
    this.state = this.updateProfile.controls['state'];
    this.country = this.updateProfile.controls['country'];
    this.phone = this.updateProfile.controls['phone'];
    this.birthDate = this.updateProfile.controls['birthDate'];
    this.pinCode = this.updateProfile.controls['pinCode'];
    this.about = this.updateProfile.controls['about'];
    this._id = this.updateProfile.controls['_id'];
    this.profession = this.updateProfile.controls['profession'];

  }
  loadMap(): any {
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          console.log("Place Changed");
          this.ngZone.run(() => {
            let place: any = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }
  /*Load Country */
  LoadCountry(): any {
    this.api.getCountries().subscribe(res => {
      this.countryArray = res.data;
    }, Error => {
      console.log(Error);
    });
  }
  LoadState(countryName): any {
    this.api.getStates(countryName).subscribe(res => {
      this.stateArray = res.data[0].States;
    })
  }
  loadState() {
    this.LoadState(this.country.value);
  }
  loadCity() {
    let data = this.stateArray.filter(x => x.StateName == this.state.value);
    this.stateCity = data[0].Cities;
  }
  updateProfileSubmit(): any {
    if (this.updateProfile.valid) {
      this.useApi.updateUser(this.updateProfile.value).subscribe(
        res => {
          console.log(res);
          this.profileUpdated.emit(true);
        }
        , Error => { console.log(Error); }
      )
    }
    else {
      this.errorMessage = "Form Not Valid.";
      this.validateAllFormFields(this.updateProfile);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
}
