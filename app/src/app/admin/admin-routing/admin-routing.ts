import { UpdateAboutComponent } from './../admin/upadate-user/update-about/update-about.component';
import { UpadateUserComponent } from './../admin/upadate-user/upadate-user.component';
import { UserTypeComponent } from './../user-type/user-type.component';
import { AuthGuard } from './../../auth.guard';

import { AdminComponent } from './../admin/admin.component';
import { AddUserComponent } from './../admin/add-user/add-user.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const appRoute: Routes = [
    {
        path: 'admin',
        data: {
            breadcrumb: "Admin"
        },
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard1',
                pathMatch: 'full',
                data: {
                    breadcrumb: "DashBoard"
                }

            },
            {
                path: 'add-user',
                component: AddUserComponent,
                data: {
                    breadcrumb: "Add User"
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
