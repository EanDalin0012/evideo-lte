import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VLayoutComponent } from './v-layout/v-layout/v-layout.component';
import { BlankLayoutComponent } from './v-layout/blank-layout/blank-layout.component';
import { VLayoutModule } from './v-layout/v-layout.module';
import { VShareModule } from './v-share/v-share.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { HttpClient, HttpClientModule } from '@angular/common/http';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};
import { ToastrModule } from 'ngx-toastr';
import { AllModulesService } from '../assets/all-modules-data/all-modules.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    VLayoutComponent,
    BlankLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VLayoutModule,
    VShareModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AllModulesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
