
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse  } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import * as $ from 'jquery';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthentcatiionService } from './authentcatiion.service';
import { ModalService } from './modal.service';
import { MyLogUtil } from '../util/my-log-util';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
 // private util = new Util();
  private timeoutmillsec = 120000;
  private longtimeApis = ["MAN1006"];

 constructor(
    private authService: AuthentcatiionService,
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone,
    private modal: ModalService
  ) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Http Intercepter run.");
    // for( var idx=0 ; idx < this.longtimeApis.length ; idx++ ) {
    //   if( req.url.indexOf(this.longtimeApis[idx]) > 0 ){
    //     environment.production ? (() => '')() : console.log("timeout sec changed.");
    //     this.timeoutmillsec = 2 * 60 * 1000;
    //     break;
    //   }
    // };

    // console.log("AuthInterceptor intercept req => " + JSON.stringify(req.url));
    // console.log("AuthInterceptor intercept req => " + JSON.stringify(req.url.includes('/assets')));

    // Ignore path
    // if (req.url.indexOf('/assets') === -1 && req.url.indexOf('/security_check') === -1 && req.url.indexOf('/RSA') === -1 && req.url.indexOf('/AES') === -1) {
      // console.log("Communicate Start.");
      // $("div.loading").removeClass("none");
      // if (!this.authService.hasSession()) {
      //   // clonedRequest = req.clone({ headers: req.headers
      //   //   .append( 'Authorization', 'Bearer ' + this.authService.getAccessToken())
      //   //   .append( 'X-Requested-With', 'XMLHttpRequest')});
      //   console.log('hasSession');

      //   this.showErrMsg("NOTLOGIN");
      //   // return false;
      // }

    // }

    // let clonedRequest = null;
    // clonedRequest = req.clone({ headers: req.headers});
    // acccess token header append

    // console.log('new headers', clonedRequest.headers.keys());
    return next.handle(req).timeout(this.timeoutmillsec)
    .map(event => {

      let apiname = req.url.split(environment.bizServer.context)[1];

      if(!apiname){
        apiname = req.url;
      }

      // if (environment.encryptionUse) {
      //   const aesInfo: any = this.util.getSecureStorage(AES_INFO.STORE) || {};

      //   if (event instanceof HttpResponse && event.body.body && typeof event.body.body === "string") {
      //     event = event.clone({ body: {
      //       header: event.body.header,
      //       body: JSON.parse(this.decrypt(event.body.body, aesInfo.aesKey))
      //     }});
      //   }

      // }

      if (event instanceof HttpResponse){
        MyLogUtil.log(" Response Code : " + apiname);
      }
      //"CBK_SES_001"

      return event;
    })
    .pipe(
      finalize(() => {
        MyLogUtil.log("Communicate finish.");
        $("div.loading").addClass("none") ;
      })
    )
    .catch((error: HttpErrorResponse) => {
      // intercept the respons error and displace it to the console
      // console.log('Error Occurred');
      // console.log('Error Occurred => ' + JSON.stringify(error));

      // Access Token이 Expired 되었다면...
      // ------------------------------------------------------------------

      // ------------------------------------------------------------------
      MyLogUtil.log('HttpErrorResponse', error);
      $("div.loading").addClass("none");
      // environment.production ? (() => '')() : console.log(req.url + " reqeusting failed. " );
      // console.log("Http Response Error");
      // console.log(error);
      let httpErrorCode;
      // if (error instanceof HttpErrorResponse) {
      if (error.status){
        httpErrorCode = error.status;
      } else {
        httpErrorCode = '999999';
      }
      MyLogUtil.log('error', error);
      if(error.status === 401) {
        this.showErrMsg(error.error.error_description);
        this.zone.run(() =>  this.router.navigate(['/login'],{ replaceUrl: true }));
        return Observable.of(new HttpResponse({body:{ 'header':{'result':false, 'resultCode': httpErrorCode },'body':{}} }));
      }
      if(error.status == 401 && error.error.error === 'invalid_token') {
        this.modal.alert(
          error.error.error_description,
         {
          modalClass: 'open-alert',
          btnText: this.translate.instant('Common.Button.Confirme'),
          callback :() => {

          }
        });
        this.zone.run(() =>  this.router.navigate(['/login'],{ replaceUrl: true }));
        return Observable.of(new HttpResponse({body:{
          'header':{'result':false, 'resultCode': httpErrorCode },
          'result': {
            responseCode: '401',
            responseMessage: 'invalid_token'
          },
          'body':{

          }
        } }));
      }

      // if (error.status >= 400 && error.status < 500) {
      //   this.zone.run(() =>  this.router.navigate(['announce/4error']));
      // } else if (error.status >= 500 && error.status < 600) {
      //   this.zone.run(() =>  this.router.navigate(['announce/5error']));
      // }
      // else {
      //   this.zone.run(() => this.router.navigate(['announce/5error']));
      // }
      //  this.showErrMsg("REQFAIL");
      //  this.zone.run(() => this.router.navigate(['announce/5error']));
      //   else if (error.status === 0) {
      //     this.router.navigate(['/index01']);
      //   }
      // } else {

      //   this.zone.run(() => this.router.navigate(['announce/5error']));
      // }

      return Observable.of(new HttpResponse({
        body:{
          'header':{'result':false, 'resultCode': httpErrorCode },
          'result': {
            responseCode: '500',
            responseMessage: 'Internal Server Error'
          },
          'body':{

          }
        }
      }));
    }) as any;
  }

  showErrMsg(msgKey: string){
        let msg = '';
        switch (msgKey) {
          case 'UserNameNotFound':
            msg = this.translate.instant('ServerResponseCode.Label.UserNotFound');
            break;
          case 'UserLocked':
            msg = this.translate.instant('ServerResponseCode.Label.UserLocked');
            break;
          case 'UserDisabled':
            msg = this.translate.instant('ServerResponseCode.Label.UserDisabled');
            break;
          case 'UserExpired':
            msg = this.translate.instant('ServerResponseCode.Label.UserExpired');
            break;
          case 'InvalidPassword':
              msg = this.translate.instant('ServerResponseCode.Label.InvalidPassword');
              break;
          default:
            msg = this.translate.instant('ServerResponseCode.Label.Unauthorized');
            break;
        }
        this.modal.alert(
          msg,
         {
          modalClass: 'open-alert',
          btnText: this.translate.instant('Common.Button.Confirme'),
          callback :() => {
            this.zone.run(() =>  this.router.navigate(['/login']));
          }
        });
  }

  showErrMsg1(msgKey: string){
    this.translate.get('COMMON.ERROR').subscribe( message => {
      if(msgKey === "NOTLOGIN"){
        this.modal.alert(
         message[msgKey],
         {
          modalClass: 'open-alert',
          callback :() => {
            this.zone.run(() =>  this.router.navigate(['/login']));
          }
        });
      } else {
        this.modal.alert(
          message[msgKey],
          {
            callback :() => {
              this.zone.run(() =>  this.router.navigate(['/login'], { replaceUrl: true }));
            }
        });

      }
    });
  }
}
