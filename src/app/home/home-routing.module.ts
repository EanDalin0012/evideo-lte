import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { VHomeComponent } from './v-home/v-home.component';
import { VideoAddComponent } from './video-add/video-add.component';

const routes: Routes = [
  {
    path: '',
    component : VHomeComponent,
    children: [
      {path: '', component: VideoComponent},
      {path: 'vd-add', component: VideoAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
