import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public/public.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule, ServicesModule
  ],
  declarations: [PublicComponent, HomeComponent, AboutComponent, ContactComponent]
})
export class PublicModule { }
