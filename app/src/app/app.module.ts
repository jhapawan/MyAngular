import { AuthGuard } from './auth.guard';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { SocialSignupModule } from './social-signup/social-signup.module';
import { AppRoutingModule } from './route/app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    LoginModule, AppRoutingModule, SocialSignupModule,
    ServicesModule, HttpClientModule, AdminModule
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
