import { Router, ActivatedRoute, Route, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { LoaderService } from './services/shared/loader';
import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLoader: boolean;
  constructor(
    private loaderService: LoaderService, private cd: ChangeDetectorRef, @Inject(DOCUMENT) private document, private route: ActivatedRoute, private router: Router) {
    //this.document.getElementById('theme').setAttribute('href', 'assets/public/css/clean-blog.min.css');
    console.log(route.url)
    //.subscribe(x => console.log(x));
    // this.router.events.subscribe(z => { console.log(z) })
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
