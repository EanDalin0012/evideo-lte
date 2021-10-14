import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { VAccountComponent } from './v-account/v-account.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {
    path: '',
    component : VAccountComponent,
    children: [
      {path: '', component: UserComponent},
      {path: 'user-add', component: UserAddComponent},
      {path: 'user-edit', component: UserAddComponent},
    ]
  },
  // { path: '',   component : UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
