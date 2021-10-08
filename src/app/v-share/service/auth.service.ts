import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Utils } from '../util/utils.static';
import { AES_INFO, LOCAL_STORAGE } from '../constants/common.const';
import { MyLogUtil } from '../util/my-log-util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // util = new Util();
  curUrl: string = '';

  constructor(
    // private modalService: ModalService,
    private router: Router
  ) {
  }

  // Session Existence
  public hasPermission(currentUrl: string): boolean {
    MyLogUtil.log('apply check Permission');
    let checkResult = false;
    environment.production ? (() => '')() : console.log("Permission check Start " + currentUrl);


    // const userMenus = Utils.getSecureStorage("MENU_RIGHT");
    const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    // console.log("this.isTargetPath " + this.isTargetPath(currentUrl));
    if(this.isTargetPath(currentUrl)){
      if ( userInfo && authorization) {
        checkResult = true;
      } else {
        // if (userMenus) {
        //   userMenus.every( function ( item: { [x: string]: string; }, index: any ) {
        //     if( currentUrl.indexOf(item["level1MenuDescription"] + "/" +item["level2MenuDescription"]) !== -1 ){
        //       // console.log("current url " + currentUrl);
        //       // console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
        //       checkResult = true;
        //       return false; //for loop break;
        //     }else{
        //       // console.log("current url " + currentUrl);
        //       // console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
        //       return true; //for loop continue;
        //     }
        //   });
        // } else {
        //   checkResult = false;
        // }
        checkResult = false;
      }
    } else {
      checkResult = true;
    }

   environment.production ? (() => '')() : console.log("pemission check finish." + checkResult );

    return checkResult;

  }

  private isTargetPath(currentUrl: string){

    environment.production ? (() => '')() : console.log("isTargetPath" + currentUrl);

    let checkResult = true;
    const nonPermissionMenu = ["main/home", "announce","/main/setting/detail"];

    // nonPermissionMenu.every(function( item, index ) {
    nonPermissionMenu.every(function( item, index ) {
      if( currentUrl.indexOf(item) !== -1 ){
        // console.log("current url " + currentUrl);
        // console.log("menu url " + item);
        checkResult = false;
        return false;
      } else {
        // console.log("current url " + currentUrl);
        // console.log("menu url " + item);
        return true;
      }
    });

    environment.production ? (() => '')() : console.log("isTargetPath check finish. " + checkResult);

    return checkResult;

  }

  //Session Existence
  public hasSession(): boolean {

    // if (!this.isEventTimeOver() ){
    //     if (Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO)){
    //       return true;
    //     } else{
    //       return false;
    //     }
    // } else {
    //   return false;
    // }
    if (Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO) &&Utils.getSecureStorage(LOCAL_STORAGE.Authorization)){
      return true;
    } else{
      return false;
    }
  }

   // Session Existence
   public getUserInfo(): any {
     return Utils.getSecureStorage("USER_INFO");
  }

  public logout() {
    Utils.removeSecureStorage(AES_INFO.STORE);
    Utils.removeSecureStorage("USER_INFO");
    Utils.removeSecureStorage("MENU_RIGHT");
    Utils.removeSecureStorage("FIRST_LOAD");

    Utils.removeSecureStorage('SEARCH_CONDITION');
    Utils.removeSecureStorage('SEARCHFAQ_CONDITION');
    Utils.removeSecureStorage('INQUIRY_CONDITION');

    this.router.navigate(['/login']);
  }

  /**
   *Last event time setting
   */
  public setLastEventTime(): void {
    Utils.setSecureStorage("lastEventTime", String(new Date().getTime()));
  }

  /**
   * Reset Last Event Time
   */
  public initLastEventTime(): void {
    Utils.setSecureStorage("lastEventTime", "-1");
  }

  /**
* 1 second : 1000, 1 minute : 60000
    * Return the last event Time
    * If lastEventTime is not set, -1 is returned.
   */
  public getLastEventTime(): number {

    const lastEventTime = Number(Utils.getSecureStorage("lastEventTime"));

    return lastEventTime ? lastEventTime : -1;
  }

  /**
* 1 second : 1000, 1 minute : 60000
    * Current Time - Returns the last event Time value
    * If lastEventTime is not in storage, an error occurs.
   */
  public getEventTimeDiff(): number {

    const lastEventTime = Number(Utils.getSecureStorage("lastEventTime"));

    if (lastEventTime) {
      return new Date().getTime() - lastEventTime;
    } else {
      throw new Error("'lastEventTime' is not defined.");
    }
  }

  /**
   * 1초 : 1000, 1분 : 60000
   * Returns true if the current time from the last event time is greater than the received value.
    * Current Time - Last event Time > Received reference value
    * If lastEventTime is not in storage, an error occurs.
   */
  public isEventTimeOver(time?: number): boolean {
    const lastEventTime = Number(Utils.getSecureStorage("lastEventTime"));

    if (lastEventTime) {
      return new Date().getTime() - lastEventTime > (time || environment.autoLogoutTime);
    } else {
      // throw new Error("'lastEventTime' is not defined.");
      return false;
    }
  }


}
