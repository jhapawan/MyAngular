import { LoaderService } from './../../services/shared/loader';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() pateTitle;
  @Input() breadcumTitle;
  showLoader: boolean;
  constructor(
    private loaderService: LoaderService, private cd: ChangeDetectorRef) {
  }
  ngOnInit() {

  }
  ngAfterViewInit() {

  }


}
