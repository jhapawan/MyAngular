import { OrderBy } from './../services/shared/orderby';
import { CommonService } from './../services/shared/common.service';
import { HttpClientModule } from '@angular/common/http';
import { DataCommunicateService } from './../services/data-communicate.service';
import { UserServiceService } from './../services/user/user-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './../auth.guard';
import { AdminRoutingModule } from './admin-routing/admin-routing';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingComponent } from './setting/setting.component';
import { MenuComponent } from './menu/menu.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { UpadateUserComponent } from './admin/upadate-user/upadate-user.component';
import { UpdateAboutComponent } from './admin/upadate-user/update-about/update-about.component';
import { BsDatepickerModule, TypeaheadModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AddExeperienceComponent } from './admin/upadate-user/add-exeperience/add-exeperience.component';
import { AddEducationComponent } from './admin/upadate-user/add-education/add-education.component';
import { AddSkillComponent } from './admin/upadate-user/add-skill/add-skill.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UserGallaryComponent } from './admin/user-gallary/user-gallary.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChuVjyJNiDLZjU-S59au7YfvQiPnASVQ0',
      libraries: ['places'],
    })
  ],
  declarations: [AdminComponent, HeaderComponent, FooterComponent, SettingComponent, MenuComponent, AddUserComponent, UserTypeComponent, UpadateUserComponent, UpdateAboutComponent, AddExeperienceComponent, AddEducationComponent, OrderBy, AddSkillComponent, BreadcrumbComponent, UserGallaryComponent]
  , providers: [AuthGuard, UserServiceService, DataCommunicateService, CommonService]
})
export class AdminModule { }
