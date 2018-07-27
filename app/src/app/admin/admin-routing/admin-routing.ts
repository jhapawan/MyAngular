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
