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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MovieComponent } from './movie/movie.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieTypeComponent } from './movie-type/movie-type.component';
import { MovieTypeAddComponent } from './movie-type-add/movie-type-add.component';
import { MovieTypeEditComponent } from './movie-type-edit/movie-type-edit.component';
import { MovieTypeSettingComponent } from './movie-type-setting/movie-type-setting.component';
import { ClientVdSettingComponent } from './client-vd-setting/client-vd-setting.component';
import { VideoSourcePlayComponent } from './video-source-play/video-source-play.component' ;
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { VideoPreViewComponent } from './video-pre-view/video-pre-view.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    VHomeComponent,
    VideoComponent,
    VideoAddComponent,
    VideoEditComponent,
    VideoSourceComponent,
    VideoSourceAddComponent,
    VideoSourceEditComponent,
    MovieComponent,
    MovieAddComponent,
    MovieEditComponent,
    MovieTypeComponent,
    MovieTypeAddComponent,
    MovieTypeEditComponent,
    MovieTypeSettingComponent,
    ClientVdSettingComponent,
    VideoSourcePlayComponent,
    VideoPreViewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    VShareModule,
    DataTablesModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  exports: [
    DataTablesModule
  ]
})
export class HomeModule { }
