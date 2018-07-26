import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RsaService } from '../shared/helper/rsaservice';
import { SigupComponent } from './sigup/sigup.component';
@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot()
  ],
  declarations: [LoginComponent, SigupComponent],
  providers: [RsaService]
})
export class LoginModule { }
