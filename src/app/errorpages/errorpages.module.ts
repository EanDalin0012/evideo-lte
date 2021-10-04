import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error500Component } from './error500/error500.component';
import { Error400Component } from './error400/error400.component';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    Error500Component,
    Error400Component,
    Error404Component
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorpagesModule { }
