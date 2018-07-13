import { publicPageName } from './../../shared/config';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations'

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* => *', [
        query(':leave', [
          animate('500ms ease', style({ opacity: 0, transform: 'translateY(100px)' }))
        ], { optional: true }),
      ])
    ])
  ]
})
export class PublicComponent implements OnInit {
  bannerImage = 'assets/public/img/home-bg.jpg'
  pageNames = publicPageName.data;
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log(title);
        if (title == "about") {
          this.bannerImage = 'assets/public/img/about-bg.jpg';
        }
        if (title == "contact") {
          this.bannerImage = 'assets/public/img/contact-bg.jpg';
        }
        if (title == "Home") {
          this.bannerImage = 'assets/public/img/home-bg.jpg';
        }
        if (title == "") {
          this.bannerImage = 'assets/public/img/home-bg.jpg';
        }

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
  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'one';
  }
  ngOnInit() {

  }

}
