
import { LOCAL_STORAGE } from '../constants/common.const';
export abstract class Utils {

   constructor() {

   }
    // public static getUserInfo(): User {
    //   const data = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER_INFO));

    //   const currentTodoList = this.storage.get('') || [];

    //   return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER_INFO));

    // }

    public static setSecureStorage( sKey: string, oValue: any ) {
      oValue = this.stringjson(oValue);
      window.localStorage.setItem(sKey, oValue);
    }

    static stringjson(oValue: any): any {
      const value =  oValue !== undefined && oValue !== null ? JSON.stringify(oValue) : '';
      return value;
    }

    public static getSecureStorage( sKey: string ): any {
      let data = window.localStorage.getItem(sKey);
      data = this.parsejson(data);
      return data;
    }

    static parsejson(data: any) {
      let retValue;
      if ( data !== undefined && data !== '') {
        retValue = JSON.parse(data);
      } else {
          retValue = data;
      }
      return retValue;
    }

    public static removeSecureStorage(sKey: string) {
      window.localStorage.removeItem(sKey);
    }

   // 100 - ( 15 / 100)
}
