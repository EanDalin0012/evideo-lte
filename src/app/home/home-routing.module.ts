import { AuthGuard } from './../v-share/guard/guard.guard';
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
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieTypeAddComponent } from './movie-type-add/movie-type-add.component';
import { MovieTypeEditComponent } from './movie-type-edit/movie-type-edit.component';
import { VideoPreViewComponent } from './video-pre-view/video-pre-view.component';

const routes: Routes = [
  {
    path: '', component : VHomeComponent,
    children: [
      {path: '', component: VideoComponent},
      {path: 'vd-add', component: VideoAddComponent},
      {path: 'vd-edit', component: VideoEditComponent},

      {path: 'vd-source', component: VideoSourceComponent},
      {path: 'vd-source-play', component: VideoSourcePlayComponent},
      {path: 'vd-source-add', component: VideoSourceAddComponent},
      {path: 'vd-source-edit', component: VideoSourceEditComponent},
      {path: 'vd-source-pre-view', component: VideoPreViewComponent},

      {path: 'seting-sub-movie-type', component: MovieTypeComponent},
      {path: 'seting-sub-movie-type-add', component: MovieTypeAddComponent},
      {path: 'seting-sub-movie-type-edit', component: MovieTypeEditComponent},

      {path: 'seting-client-vd', component: ClientVdSettingComponent},

      {path: 'seting-movie-type', component: MovieComponent},
      {path: 'seting-movie-type-add', component: MovieAddComponent},
      {path: 'seting-movie-type-edit', component: MovieEditComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
