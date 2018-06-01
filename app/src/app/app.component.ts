import { LoaderService } from './services/shared/loader';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLoader: boolean;
  constructor(
    private loaderService: LoaderService, private cd: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
      this.cd.detectChanges();
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
