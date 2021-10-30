import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPipe } from './pipe/account.pipe';
import { AccountStatusPipe } from './pipe/account-status.pipe';
import { AccountTypePipe } from './pipe/account-type.pipe';
import { AccountBalancePipe } from './pipe/account-balance.pipe';
import { AccountTypeCodePipe } from './pipe/account-type-code.pipe';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { GenderPipe } from './pipe/gender.pipe';
import { ModalComponent } from './component/modal/modal.component';
import { AlertDialogComponent } from './component/alert-dialog/alert-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActionComponent } from './component/action/action.component';
import { StatusYNComponent } from './component/status-yn/status-yn.component';
import { SrcImgComponent } from './component/src-img/src-img.component';
import { ArgBtnComponent } from './component/arg-btn/arg-btn.component';
import { AvatarModule } from 'ngx-avatar';
import { StatusComponent } from './component/status/status.component';
import { PhoneNumberFormatPipe } from './pipe/phone-number-format.pipe';
import { PhoneNumberComponent } from './component/phone-number/phone-number.component';

@NgModule({
  declarations: [
    ModalComponent,
    AlertDialogComponent,
    // Pipe
    AccountPipe,
    AccountStatusPipe,
    AccountTypePipe,
    AccountBalancePipe,
    AccountTypeCodePipe,
    DateFormatPipe,
    GenderPipe,
    ActionComponent,
    StatusYNComponent,
    SrcImgComponent,
    ArgBtnComponent,
    StatusComponent,
    PhoneNumberFormatPipe,
    PhoneNumberComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AvatarModule,
    // DataTablesModule,
    // Pipe
    AccountPipe,
    AccountStatusPipe,
    AccountTypePipe,
    AccountBalancePipe,
    AccountTypeCodePipe,
    DateFormatPipe,
    GenderPipe,
    PhoneNumberFormatPipe
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class VShareModule {
  static forRoot(): ModuleWithProviders<VShareModule> {
    return {
      ngModule: VShareModule,
      providers: []
    };
  }
 }
