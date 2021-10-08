import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.prod';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    // private modal: ModalService,
    private translate: TranslateService,
    private zone: NgZone,
    private location: Location
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
    alert(msgKey);
    this.translate.get('COMMON.ERROR').subscribe( message => {

      if(msgKey == "NOTLOGIN"){

        this.zone.run(() =>  this.router.navigate(['/login']));

        // this.modal.alert({
        //   content : message[msgKey],
        //   callback :() => {
        //     this.zone.run(() =>  this.router.navigate(['/login']));
        //   }
        // });

      }

      if(msgKey == "NOACCESS"){
        alert(message[msgKey]);
        this.zone.run(() =>  this.router.navigate(['/home']));
        // this.modal.alert({
        //   content : message[msgKey],
        //   callback :() => {
        //     this.zone.run(() =>  this.router.navigate(['/main/home']));
        //   }
        // });

      }


    });
  }

}
