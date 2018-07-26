import { Router, ActivatedRoute, Route, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { LoaderService } from './services/shared/loader';
import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { appConfig, publicPageName } from './shared/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pageNames = publicPageName.data;
  showLoader: boolean;
  pageTitle: string = "";
  constructor(
    private loaderService: LoaderService, private cd: ChangeDetectorRef, @Inject(DOCUMENT) private document, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        this.title = title;
        // if (this.pageNames.filter(x => x == title).length > 0) { this.document.getElementById('theme').setAttribute('href', 'assets/public/css/clean-blog.min.css'); }
        // else { this.document.getElementById('theme').setAttribute('href', ''); }
      }
    });
  }
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));


    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
      this.cd.detectChanges();
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();

  }
}
