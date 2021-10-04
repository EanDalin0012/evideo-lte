import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAccountComponent } from './v-account/v-account.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [
    VAccountComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
