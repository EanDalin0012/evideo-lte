
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VLayoutComponent } from './v-layout/v-layout/v-layout.component';
import { BlankLayoutComponent } from './v-layout/blank-layout/blank-layout.component';
import { Error404Component } from './errorpages/error404/error404.component';
import { Error500Component } from './errorpages/error500/error500.component';
import { AuthGuard } from './v-share/guard/guard.guard';

const routes: Routes = [
  {
    path: '', component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
      }
    ]
  },
  {
    path: '', component: VLayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '', component: VLayoutComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  // { path: 'announce/4error', component: Error4Component },
  { path: 'error500', component: Error500Component },
  { path: '**', component: Error404Component },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
