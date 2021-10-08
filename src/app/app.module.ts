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

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};
import { ToastrModule } from 'ngx-toastr';
import { AllModulesService } from '../assets/all-modules-data/all-modules.service';
import { AuthInterceptor } from './v-share/service/auth-interceptor.service';
import { AuthGuard } from './v-share/guard/guard.guard';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { ActionComponent } from './v-share/component/action/action.component';

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
    DataTablesModule,
    VShareModule.forRoot(),
    AgGridModule.withComponents([
      ActionComponent
    ]),
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
    AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
