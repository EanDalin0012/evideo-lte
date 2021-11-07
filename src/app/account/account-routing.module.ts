import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { VAccountComponent } from './v-account/v-account.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component : VAccountComponent,
    children: [
      {path: '', component: UserComponent},
      {path: 'user-add', component: UserAddComponent},
      {path: 'user-edit', component: UserEditComponent},
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'user-detail', component: UserDetailComponent}
    ]
  },
  // { path: '',   component : UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
