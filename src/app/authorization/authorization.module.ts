import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockLoginComponent } from './lock-login/lock-login.component';
import { LoginComponent } from './login/login.component';
import { VAuthorizationComponent } from './v-authorization/v-authorization.component';
import { VShareModule } from '../v-share/v-share.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';



@NgModule({
  declarations: [
    LockLoginComponent,
    LoginComponent,
    VAuthorizationComponent
  ],
  imports: [
    CommonModule,
    VShareModule,
    AuthorizationRoutingModule

  ]
})
export class AuthorizationModule { }
