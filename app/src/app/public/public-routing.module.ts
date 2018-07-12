import { ContactComponent } from './public/contact/contact.component';
import { AboutComponent } from './public/about/about.component';
import { HomeComponent } from './public/home/home.component';
import { PublicComponent } from './public/public.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: "CS"
    },
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: { title: 'Home' }

      },
      {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full',
        data: { title: 'about' }

      },
      {
        path: 'contact',
        component: ContactComponent,
        pathMatch: 'full',
        data: { title: 'contact' }

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {

}
