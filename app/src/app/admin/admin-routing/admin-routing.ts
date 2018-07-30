import { MypackComponent } from './../mypack/mypack.component';
import { AddBlogComponent } from './../add-blog/add-blog.component';
import { AddmasterskillComponent } from './../admin/addmasterskill/addmasterskill.component';
import { AddSkillComponent } from './../admin/upadate-user/add-skill/add-skill.component';
import { DashboardComponent } from './../admin/dashboard/dashboard.component';
import { UpdateAboutComponent } from './../admin/upadate-user/update-about/update-about.component';
import { UpadateUserComponent } from './../admin/upadate-user/upadate-user.component';
import { UserTypeComponent } from './../user-type/user-type.component';
import { AuthGuard } from './../../auth.guard';
import { AdminComponent } from './../admin/admin.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AboutProfileComponent } from '../profile/about-profile/about-profile.component';
import { ProfileEduComponent } from '../profile/profile-edu/profile-edu.component';
import { ProfileWorkComponent } from '../profile/profile-work/profile-work.component';
import { ProfileSkillComponent } from '../profile/profile-skill/profile-skill.component';
import { ProfileGalComponent } from '../profile/profile-gal/profile-gal.component';

const appRoute: Routes = [
    {
        path: 'home',
        data: {
            breadcrumb: "Home"
        },
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {
                    breadcrumb: "DashBoard",
                    title: 'Contribute Skill - User(s) Feeds'
                }
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full',
                data: {
                    breadcrumb: "DashBoard",
                    title: 'Contribute Skill - User(s) Feeds'
                }

            },
            {
                path: 'add-blog',
                component: AddBlogComponent,
                data: {
                    breadcrumb: "Add Blog"
                }
            },
            {
                path: 'user-type',
                component: UserTypeComponent
            },
            {
                path: 'profile-view/:id',
                component: UpadateUserComponent,
                data: {
                    breadcrumb: "View Profile"
                }
            },
            {
                path: 'mypack',
                component: MypackComponent,
                data: {
                    breadcrumb: "View Profile",
                    title: 'Contribute Skill - My Pack'
                }
            },
            {
                path: 'profile-edit/:id',
                component: UpadateUserComponent,
                data: {
                    breadcrumb: "Edit Profile"
                }
            },
            {
                path: 'profile-edit-about/:id',
                component: UpdateAboutComponent,
                data: {
                    breadcrumb: "Edit Profile"
                }
            },
        ]
    }, {
        path: 'profile',
        data: {
            breadcrumb: "User Profile",
            title: 'View Profile'
        },
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'about/:id',
                component: AboutProfileComponent,
                data: {
                    breadcrumb: "Edit Profile",
                    title: 'Contribute Skill - Profile Edit'
                }
            },
            {
                path: 'edu/:id',
                component: ProfileEduComponent,
                data: {
                    breadcrumb: "Edit Profile",
                    title: 'Contribute Skill - Profile Edit Education'
                }
            },
            {
                path: 'work/:id',
                component: ProfileWorkComponent,
                data: {
                    breadcrumb: "Edit Profile",
                    title: 'Contribute Skill - Profile Edit Work Experience'
                }
            },
            {
                path: 'skill/:id',
                component: ProfileSkillComponent,
                data: {
                    breadcrumb: "Edit Profile",
                    title: 'Contribute Skill - Profile Edit Add Skill'
                }
            },
            {
                path: 'gal/:id',
                component: ProfileGalComponent,
                data: {
                    breadcrumb: "Edit Profile",
                    title: 'Contribute Skill - Profile Edit Gallary'
                }
            },
        ]
    }


];

@NgModule({
    imports: [
        RouterModule.forChild(appRoute)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
