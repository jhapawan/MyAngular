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
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard1',
                pathMatch: 'full'

            },
            {
                path: 'add-user',
                component: AddUserComponent
            },
            {
                path: 'user-type',
                component: UserTypeComponent
            },
            {
                path: 'profile-view/:id',
                component: UpadateUserComponent
            },
            {
                path: 'profile-edit/:id',
                component: UpadateUserComponent
            },
            {
                path: 'profile-edit-about/:id',
                component: UpdateAboutComponent
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
