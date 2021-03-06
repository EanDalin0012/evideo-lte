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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgxMaskModule} from 'ngx-mask';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component'
@NgModule({
  declarations: [
    VAccountComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    MyImgComponent,
    UserProfileComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    VShareModule,
    DataTablesModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot({
      showMaskTyped : false,
      // clearIfNotMatch : true
    }),
    AgGridModule.withComponents([]),
  ],
  exports: [
    DataTablesModule
  ]
})
export class AccountModule { }
