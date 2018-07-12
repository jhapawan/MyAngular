import { DashboardComponent } from './../admin/admin/dashboard/dashboard.component';
import { AuthGuard } from './../auth.guard';
import { AdminComponent } from './../admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
const appRoute: Routes = [

  {
    path: 'home',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: 'app/public/public.module#PublicModule',
    data: {
      id: "public"
    },
  },
  {
    path: 'login',
    component: LoginComponent
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
