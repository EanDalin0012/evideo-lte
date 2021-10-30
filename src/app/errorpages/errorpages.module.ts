import { VShareModule } from './../v-share/v-share.module';
import { ErrorRoutingModule } from './errorpages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error500Component } from './error500/error500.component';
import { Error400Component } from './error400/error400.component';
import { Error404Component } from './error404/error404.component';
import { Error403Component } from './error403/error403.component';
import { LoadingTestingComponent } from './loading-testing/loading-testing.component';
import { VErrorpagesComponent } from './v-errorpages/v-errorpages.component';



@NgModule({
  declarations: [
    Error500Component,
    Error400Component,
    Error404Component,
    Error403Component,
    LoadingTestingComponent,
    VErrorpagesComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    VShareModule
  ]
})
export class ErrorpagesModule { }
