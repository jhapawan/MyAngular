

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RsaService } from '../shared/helper/rsaservice';
@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [RsaService]
})
export class LoginModule { }
