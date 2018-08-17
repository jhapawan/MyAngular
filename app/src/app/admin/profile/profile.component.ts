import { Component, OnInit } from '@angular/core';
import { ToastMessage } from '../../shared/toast-message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  toastConfig = this.toastMessage.toastConfig;
  constructor(private toastMessage: ToastMessage) { }

  ngOnInit() {
  }

}
