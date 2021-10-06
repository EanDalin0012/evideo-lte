import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { VHomeComponent } from './v-home/v-home.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { MovieComponent } from './movie/movie.component';
import { MovieTypeComponent } from './movie-type/movie-type.component';
import { ClientVdSettingComponent } from './client-vd-setting/client-vd-setting.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoSourceComponent } from './video-source/video-source.component';
import { VideoSourceAddComponent } from './video-source-add/video-source-add.component';
import { VideoSourceEditComponent } from './video-source-edit/video-source-edit.component';
import { VideoSourcePlayComponent } from './video-source-play/video-source-play.component';

const routes: Routes = [
  {
    path: '',
    component : VHomeComponent,
    children: [
      {path: '', component: VideoComponent},
      {path: 'vd-add', component: VideoAddComponent},
      {path: 'vd-edit', component: VideoEditComponent},
      {path: 'vd-source', component: VideoSourceComponent},
      {path: 'vd-source-play', component: VideoSourcePlayComponent},
      {path: 'vd-source-add', component: VideoSourceAddComponent},
      {path: 'vd-source-edit', component: VideoSourceEditComponent},
      {path: 'seting-movie', component: MovieComponent},
      {path: 'seting-movie-type', component: MovieTypeComponent},
      {path: 'seting-client-vd', component: ClientVdSettingComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
