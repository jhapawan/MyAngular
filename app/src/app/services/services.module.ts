import { BlogService } from './blog/blog.service';
import { LoaderService } from './shared/loader';
import { AuthenticateService } from './auth/authenticate.service';
import { AuthService } from 'angular5-social-login';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicService } from './public/public.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthenticateService, LoaderService, BlogService, PublicService]
})
export class ServicesModule { }
