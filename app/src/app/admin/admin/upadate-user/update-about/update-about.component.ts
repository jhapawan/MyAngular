import { IntrestedIn } from './../../../../shared/selectize/selectize';
import { UserServiceService } from './../../../../services/user/user-service.service';
import { CommonService } from './../../../../services/shared/common.service';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel } from './../../../../shared/model/user';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastMessage } from '../../../../shared/toast-message';

declare var google: any;
@Component({
  selector: 'app-update-about',
  templateUrl: './update-about.component.html',
  styleUrls: ['./update-about.component.css'],


})
export class UpdateAboutComponent implements OnChanges, OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @Input() userData: UserModel;
  @Input() isPageRefresh;
  @Output() profileUpdated = new EventEmitter();
  toastConfig = this.toastMessage.toastConfig;
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
  intrestedIn: AbstractControl;
  profession: AbstractControl;
  /* @param fb End of form declartion    */
  minDate = new Date(2017, 5, 10);
  maxDate = new Date();

  countryArray: any[];
  stateArray: any[];
  customSelected: string;
  stateCity: any[];
  requiredDropdownOptions: any = IntrestedIn.slice(0);
  config: any = {
    create: true,
    labelField: 'label',
    valueField: 'value',
    maxItems: 50,
    searchField: ['label', 'value'],
  };

  value: any = [];
  constructor(private fb: FormBuilder, private ngZone: NgZone,
    private api: CommonService,
    private useApi: UserServiceService, private toastMessage: ToastMessage) {
    this.LoadCountry();
  }

  ngOnInit() {

    this.generateForm();
    //this.loadMap();
    let date = new Date();
    date.setFullYear(date.getFullYear() - 14);
    this.maxDate = date;

  }
  ngOnChanges(changes: SimpleChanges) {

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
        'birthDate': [new Date(this.userData.birthDate), Validators.compose([Validators.required])],
        'pinCode': [this.userData.pinCode, Validators.compose([Validators.required])],
        'about': [this.userData.about, Validators.compose([Validators.required])],
        'profession': [this.userData.profession, Validators.compose([Validators.required])],
        'intrestedIn': [this.userData.intrestedIn, Validators.compose([])]

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
    this.intrestedIn = this.updateProfile.controls['intrestedIn'];

  }

  // loadMap(): any {
  //   this.mapsAPILoader.load().then(
  //     () => {
  //       let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
  //       autocomplete.addListener("place_changed", () => {
  //         console.log("Place Changed");
  //         this.ngZone.run(() => {
  //           let place: any = autocomplete.getPlace();
  //           if (place.geometry === undefined || place.geometry === null) {
  //             return;
  //           }
  //         });
  //       });
  //     }
  //   );
  // }
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
          this.toastMessage.popSuccess("Success", "Data has been updated successfully!", true);
          this.profileUpdated.emit(true);
          if (this.isPageRefresh) {
            window.open('/profile/about/' + this._id.value, '_self');
          }
        }
        , Error => { console.log(Error); }
      )
    }
    else {
      this.errorMessage = "Form Not Valid.";
      this.toastMessage.popError("Error", "Form is not valid!", true);
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
