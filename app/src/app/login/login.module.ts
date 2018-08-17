import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RsaService } from '../shared/helper/rsaservice';
import { SigupComponent } from './sigup/sigup.component';
import {ToasterModule} from 'angular2-toaster';
import { ToastMessage } from '../shared/toast-message';
@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    BsDatepickerModule.forRoot(),ToasterModule.forRoot()
  ],
  declarations: [LoginComponent, SigupComponent],
  providers: [RsaService,ToastMessage]
})
export class LoginModule { }
