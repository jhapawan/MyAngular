import { PublicService } from './../../../services/public/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private publicApi: PublicService) { }
  ngOnInit() {
    this.publicApi.getAllBlog().subscribe(res => {
      console.log(res);
    },
      error => { console.log(error) })
  }

}
