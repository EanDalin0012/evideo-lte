import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VAccountComponent } from './v-account/v-account.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AccountRoutingModule } from './account-routing.module';
import { VShareModule } from '../v-share/v-share.module';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { MyImgComponent } from './my-img/my-img.component';
@NgModule({
  declarations: [
    VAccountComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    MyImgComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    VShareModule,
    AgGridModule.withComponents([
      MyImgComponent,
      UserComponent
    ]),
    DataTablesModule
  ]
})
export class AccountModule { }
