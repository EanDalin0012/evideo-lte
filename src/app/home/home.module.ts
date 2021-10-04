import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VHomeComponent } from './v-home/v-home.component';
import { VideoComponent } from './video/video.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoSourceComponent } from './video-source/video-source.component';
import { VideoSourceAddComponent } from './video-source-add/video-source-add.component';
import { VideoSourceEditComponent } from './video-source-edit/video-source-edit.component';
import { HomeRoutingModule } from './home-routing.module';
import { VShareModule } from '../v-share/v-share.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker' ;


@NgModule({
  declarations: [
    VHomeComponent,
    VideoComponent,
    VideoAddComponent,
    VideoEditComponent,
    VideoSourceComponent,
    VideoSourceAddComponent,
    VideoSourceEditComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    VShareModule,
    // DataTablesModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule { }
