import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.prod';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private zone: NgZone,
    private location: Location,
    private toastr: ToastrService,
  ) {
    this.location = location;
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
 {
    console.log('AuthGuard canActivate');

      if( !this.authService.hasSession() ){
        // alert('ddd');
        this.showErrMsg("NOTLOGIN");
        return false;
      }
      environment.production ? (() => '')() : console.log("canActivity start " + state.url);
      // console.log("!this.authService.hasPermission() " + !this.authService.hasPermission(state.url));
      // check permission access menue
      if (!this.authService.hasPermission(state.url)) {
        environment.production ? (() => '')() : console.log("you dont have permission. ");
        this.showErrMsg("NOACCESS");

        return false;
      }


      return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      environment.production ? (() => '')() : console.log("Activated Child.");
      console.log('AuthGuard canActivateChild');
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    console.log('AuthGuard canLoad');
    environment.production ? (() => '')() : console.log("canLoad.");

    return true;
  }

  showErrMsg(msgKey: string){
      if(msgKey == "NOTLOGIN"){
        this.zone.run(() =>  this.router.navigate(['/login']));
        this.toastr.error(this.translate.instant('common.message.notLogin'), this.translate.instant('common.label.error'),{
          timeOut: 5000,
        });
      }

      if(msgKey == "NOACCESS"){
        this.zone.run(() =>  this.router.navigate(['/home']));
        this.toastr.error(this.translate.instant('common.message.notLogin'), this.translate.instant('common.label.error'),{
          timeOut: 5000,
        });
      }


  }

  showErrMsg1(msgKey: string){
    let msg = '';
    switch (msgKey) {
      case 'userNotFound':
        msg = this.translate.instant('serverResponseCode.label.userNotFound');
        break;
      case 'accountLocked':
        msg = this.translate.instant('serverResponseCode.label.accountLocked');
        break;
      case 'userDisabled':
        msg = this.translate.instant('serverResponseCode.label.userDisabled');
        break;
      case 'userExpired':
        msg = this.translate.instant('serverResponseCode.label.userExpired');
        break;
      case 'invalidPassword':
          msg = this.translate.instant('serverResponseCode.label.invalidPassword');
          break;
      default:
        msg = this.translate.instant('serverResponseCode.label.unknown');
        break;
    }
    this.toastr.error(msg, this.translate.instant('common.label.error'),{
      timeOut: 5000,
    });
}

}
