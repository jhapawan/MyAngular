import { PublicService } from './../../../services/public/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blog: any = [];
  constructor(private publicApi: PublicService) { }
  ngOnInit() {
    this.publicApi.getAllBlog().subscribe(res => {
      this.blog = res.data;
    },
      error => { console.log(error) })
  }

}
