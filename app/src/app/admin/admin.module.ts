
import { SearchFilterPipe } from './../shared/search-filter.pipe';
import { NgSelectizeModule } from 'ng-selectize';
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
import { UserTypeComponent } from './user-type/user-type.component';
import { UpadateUserComponent } from './admin/upadate-user/upadate-user.component';
import { UpdateAboutComponent } from './admin/upadate-user/update-about/update-about.component';
import { BsDatepickerModule, TypeaheadModule, PaginationModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AddExeperienceComponent } from './admin/upadate-user/add-exeperience/add-exeperience.component';
import { AddEducationComponent } from './admin/upadate-user/add-education/add-education.component';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UserGallaryComponent } from './admin/upadate-user/user-gallary/user-gallary.component';
import { LoadGalaryComponent } from './admin/upadate-user/load-galary/load-galary.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileCardComponent } from './admin/profile-card/profile-card.component';
import { SocialSignupModule } from '../social-signup/social-signup.module';
import { AddSkillComponent } from './admin/upadate-user/add-skill/add-skill.component';
import { AddmasterskillComponent } from './admin/addmasterskill/addmasterskill.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ServicesModule } from '../services/services.module';
import { RightcontentComponent } from './admin/rightcontent/rightcontent.component';
import { LeftcontentComponent } from './admin/leftcontent/leftcontent.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileLeftComponent } from './profile/profile-left/profile-left.component';
import { AboutProfileComponent } from './profile/about-profile/about-profile.component';
import { ProfileEduComponent } from './profile/profile-edu/profile-edu.component';
import { ProfileWorkComponent } from './profile/profile-work/profile-work.component';
import { ProfileSkillComponent } from './profile/profile-skill/profile-skill.component';
import { ProfileGalComponent } from './profile/profile-gal/profile-gal.component';
import { MypackComponent } from './mypack/mypack.component';

import { SearchpackPipe } from './mypack/searchpack.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { ToastMessage } from '../shared/toast-message';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule, RouterModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BsDatepickerModule.forRoot(),
    CKEditorModule, Ng2SearchPipeModule,
    TypeaheadModule.forRoot(), ToasterModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyChuVjyJNiDLZjU-S59au7YfvQiPnASVQ0',
    //   libraries: ['places'],
    // }), 
    NgxPaginationModule, SocialSignupModule, NgSelectizeModule, ServicesModule, InfiniteScrollModule, PaginationModule.forRoot()
  ],
  declarations: [AdminComponent, HeaderComponent, FooterComponent, SettingComponent, MenuComponent,
    UserTypeComponent, UpadateUserComponent, UpdateAboutComponent, AddExeperienceComponent, AddEducationComponent, OrderBy, AddSkillComponent, BreadcrumbComponent,
    UserGallaryComponent, LoadGalaryComponent, DashboardComponent, ProfileCardComponent, SearchFilterPipe, AddmasterskillComponent, AddBlogComponent, RightcontentComponent, LeftcontentComponent, ProfileComponent, ProfileLeftComponent, AboutProfileComponent, ProfileEduComponent, ProfileWorkComponent, ProfileSkillComponent, ProfileGalComponent, MypackComponent, SearchpackPipe]
  , providers: [AuthGuard, UserServiceService, DataCommunicateService, CommonService, ToastMessage]
})
export class AdminModule { }
