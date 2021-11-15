import { id } from 'src/assets/all-modules-data/id';
import { AuthorizationModule } from './../constants/common.const';
import { Injectable, NgZone } from '@angular/core';
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
  authorities:any[] = [];

  constructor(
    // private modalService: ModalService,
    private router: Router,
    private zone: NgZone,
  ) {
  }

  // Session Existence
  public hasPermission(currentUrl: string): boolean {
    MyLogUtil.log('apply check Permission');
    let checkResult = false;
    environment.production ? (() => '')() : console.log("Permission check Start " + currentUrl);


    const userMenus = Utils.getSecureStorage("MENU_RIGHT");
    const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    console.log("this.isTargetPath " + this.isTargetPath(currentUrl));

    const data = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);

    this.authorities = data.authorities;

    if(this.authorities && this.authorities.length > 0) {
      this.authorities.forEach(element => {
        switch (element.id) {
          case AuthorizationModule.User_Read:
            break;
          case AuthorizationModule.Movie_Read:
            break;
          case AuthorizationModule.Setting_Movie_Type_Read:
          break;
        }
      });
    }

    if(this.isTargetPath(currentUrl)){
      if ( userInfo && authorization) {
        checkResult = true;
      } else {
        if (userMenus) {
          userMenus.every( function ( item: { [x: string]: string; }, index: any ) {
            if( currentUrl.indexOf(item["level1MenuDescription"] + "/" +item["level2MenuDescription"]) !== -1 ){
              console.log("current url " + currentUrl);
              console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
              checkResult = true;
              return false; //for loop break;
            }else{
              // console.log("current url " + currentUrl);
              // console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
              return true; //for loop continue;
            }
          });
        } else {
          checkResult = false;
        }
        checkResult = false;
      }
    } else {
      checkResult = true;
    }

   environment.production ? (() => '')() : console.log("pemission check finish." + checkResult );

    return checkResult;

  }

  public isTargetPath(currentUrl: string) {
    console.log('currentUrl', currentUrl);

    let checkResult = false;

    const permissionMenu = [
      'home', // 0
      'home/vd-add', // 1
      'home/vd-edit', // 2
      'home/vd-delete', // 3

      'home/vd-source', // 4
      'home/vd-source-add', // 5
      'home/vd-source-edit', // 6
      'home/vd-source-delete', // 7

      'home/vd-source-pre-view', // 8

      'home/seting-movie-type', // 9
      'home/seting-movie-type-add', // 10
      'home/seting-movie-type-edit', // 11
      'home/seting-movie-type-delete', // 12

      'home/seting-client-vd', // 13

      'home/seting-sub-movie-type', // 14
      'home/seting-sub-movie-type-add', // 15
      'home/seting-sub-movie-type-edit',// 16
      'home/seting-sub-movie-type-delete',// 17

      'account', // 18
      'account/user-add', // 19
      'account/user-edit', // 20
      'account/user-profile', // 21
      'account/user-delete', 22

  ];

  console.log('permissionMenu', permissionMenu[1], currentUrl);

    const data = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    this.authorities = data.authorities;
    console.log(this.authorities);

    if(this.authorities.length > 0) {
      this.authorities.forEach(element => {
        //video
         if(element.id === AuthorizationModule.Movie_Read && permissionMenu[0] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Create && permissionMenu[1] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Update && permissionMenu[2] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Delete && permissionMenu[3] === currentUrl) {
          checkResult = true;
         }

         //video-source
         if(element.id === AuthorizationModule.Movie_Source_Read && permissionMenu[4] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Source_Create && permissionMenu[5] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Source_Update && permissionMenu[6] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Movie_Source_Delete && permissionMenu[7] === currentUrl) {
          checkResult = true;
         }

        // seting-movie movie type
         if(element.id === AuthorizationModule.Setting_Movie_Type_Read && permissionMenu[9] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Movie_Type_Create && permissionMenu[10] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Movie_Type_Update && permissionMenu[11] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Movie_Type_Delete && permissionMenu[12] === currentUrl) {
          checkResult = true;
         }

// seting-client-vd
         if(element.id === AuthorizationModule.Setting_Client_Setting_Read && permissionMenu[13] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Sub_Movie_Type_Read && permissionMenu[14] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Sub_Movie_Type_Create && permissionMenu[15] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Sub_Movie_Type_Update && permissionMenu[16] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.Setting_Sub_Movie_Type_Delete && permissionMenu[17] === currentUrl) {
          checkResult = true;
         }
//user
         if(element.id === AuthorizationModule.User_Read && permissionMenu[18] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.User_Create && permissionMenu[19] === currentUrl) {
          checkResult = true;
         }
         if(element.id === AuthorizationModule.User_Update && permissionMenu[20] === currentUrl) {
          checkResult = true;
         }

         if(element.id === AuthorizationModule.User_Delete && permissionMenu[22] === currentUrl) {
          checkResult = true;
         }


          // switch(element.id) {

          //   //video
          //   case AuthorizationModule.Movie_Read && permissionMenu[0] === currentUrl:
          //     alert();
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Create && permissionMenu[1] === currentUrl:
          //     alert();
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Update && permissionMenu[2] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Delete && permissionMenu[3] === currentUrl:
          //     checkResult = true;
          //     break;

          //   //video-source
          //   case AuthorizationModule.Movie_Source_Read && permissionMenu[4] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Source_Create && permissionMenu[5] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Source_Update && permissionMenu[6] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Movie_Source_Delete && permissionMenu[7] === currentUrl:
          //     checkResult = true;
          //     break;

          //   // seting-movie movie type
          //   case AuthorizationModule.Setting_Movie_Type_Read && permissionMenu[9] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Movie_Type_Create && permissionMenu[10] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Movie_Type_Update && permissionMenu[11] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Movie_Type_Delete && permissionMenu[12] === currentUrl:
          //     checkResult = true;
          //     break;

          //   // seting-client-vd
          //   case AuthorizationModule.Setting_Client_Setting_Read && permissionMenu[13] === currentUrl:
          //     checkResult = true;
          //     break;

          //   // seting-sub-movie-type
          //   case AuthorizationModule.Setting_Sub_Movie_Type_Read && permissionMenu[14] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Sub_Movie_Type_Create && permissionMenu[15] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Sub_Movie_Type_Update && permissionMenu[16] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.Setting_Sub_Movie_Type_Delete && permissionMenu[17] === currentUrl:
          //     checkResult = true;
          //     break;

          //   // user
          //   case AuthorizationModule.User_Read && permissionMenu[18] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.User_Create && permissionMenu[19] === currentUrl:
          //     checkResult = true;
          //     break;
          //   case AuthorizationModule.User_Update && permissionMenu[20] === currentUrl:
          //     checkResult = true;
          //     break;
          // }

      });
    }


    environment.production ? (() => '')() : console.log("isTargetPath" + currentUrl);
    environment.production ? (() => '')() : console.log("checkResult" + checkResult);
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
    // Utils.clearSecureStorage();
    Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
    Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
    Utils.removeSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME);
    this.zone.run(() =>  this.router.navigate(['/login'], ));
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
