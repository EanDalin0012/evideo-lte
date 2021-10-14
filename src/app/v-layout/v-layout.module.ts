import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VShareModule } from '../v-share/v-share.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    VShareModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SlidebarComponent,
  ]
})
export class VLayoutModule { }
