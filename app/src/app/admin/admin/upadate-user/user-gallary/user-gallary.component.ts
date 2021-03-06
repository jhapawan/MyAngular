import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../../../shared/model/user';
import { Component, OnInit, trigger, transition, style, animate, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup, AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperFunction } from '../../../../shared/helper/helper';
import { UserServiceService } from '../../../../services/user/user-service.service';


@Component({
  selector: 'app-user-gallary',
  templateUrl: './user-gallary.component.html',
  styleUrls: ['./user-gallary.component.css'],
  providers: [HelperFunction],
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
export class UserGallaryComponent implements OnInit, OnChanges {

  @Input() userData: UserModel;
  galary: FormArray;
  userGalary: FormGroup;
  userId: AbstractControl;
  paramId: any;
  selectedImage = [];
  imageSrc: any[] = [];
  imageSrcCount: any;
  coumnIndex = 0;
  data: Observable<any>;
  constructor(private route: ActivatedRoute, private router: Router, private helperFunction: HelperFunction,
    private fb: FormBuilder, private useApi: UserServiceService, private ref: ChangeDetectorRef) {
    this.route.params.subscribe(params => { this.paramId = params.id; });
  }
  ngOnInit() {
    this.createForm();
  }
  ngOnChanges() {
    if (this.userData.galary.length > 0) {
      this.getGalary();
    }
  }
  createForm(): any {
    this.userGalary = this.fb.group({
      galary: this.fb.array([]),
      'userId': [this.userData._id],
    });
    this.userId = this.userGalary.controls['userId'];
  }
  addImage(event: any) {
    const control = <FormArray>this.userGalary.controls['galary'];
    for (let index = 0; index < event.target.files.length; index++) {
      this.selectedImage.push(event.target.files[index]);
      let reader = new FileReader();
      let hh = this;
      reader.onloadend = function (e) {
        let final = reader.result;
        hh.imageSrc.push(final)
      }
      let some = reader.readAsDataURL(event.target.files[index]);
      control.push(this.buildItem(event.target.files[index], ''));
      this.createRowRange();
    }
  }
  buildItem(image, imagesType) {
    return new FormGroup({
      image: new FormControl(image),
      imageType: new FormControl(imagesType)
    })
  }
  createRowRange() {
    var items: number[] = [];
    let row = Math.ceil(this.selectedImage.length / 3);
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
  updateGallary() {
    this.userId.setValue(this.userData._id);
    this.useApi.updateGallary(this.userGalary.value).subscribe(
      result => {
        if (result.status == "success") {
          window.alert(result);
        }
        else { }
      },
      error => console.log(error)
    )
  }
  getColumnIndexArray() {
    this.coumnIndex = this.coumnIndex + 1;
    return this.coumnIndex;
  }
  removedFromFormarray(index) {
    const control = <FormArray>this.userGalary.controls['galary']
    control.removeAt(index);
    //console.log(this.imageSrc.length);
    this.imageSrc.splice(index, 1);
    //console.log(this.imageSrc.length);
    this.createRowRange();
  }
  getGalary() {
    const control = <FormArray>this.userGalary.controls['galary'];
    this.imageSrc = [];
    this.selectedImage = [];
    if (this.userData.galary) {
      this.userData.galary.forEach(element => {
        let file = this.helperFunction.dataURItoBlob("http://localhost:9999" + element.imageSource);
        file.then(x => {
          let reader = new FileReader();
          let hh = this;
          reader.onloadend = function (e) {
            let final = reader.result;
            hh.imageSrc.push(final as object)
            hh.selectedImage.push(final as object)
          }
          let some = reader.readAsDataURL(x as Blob);
          control.push(this.buildItem(x as object, ''));
        });
      });
    }

  }
}
