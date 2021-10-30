import { VErrorpagesComponent } from './v-errorpages/v-errorpages.component';
import { LoadingTestingComponent } from './loading-testing/loading-testing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';

const routes: Routes = [
  // { path: '',   component : Error403Component },
  // { path: 'loading',   component : LoadingTestingComponent },
  {
    path: '',
    component : VErrorpagesComponent,
    children: [
      { path: 'loading',   component : LoadingTestingComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
