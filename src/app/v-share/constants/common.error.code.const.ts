import { TranslateService } from '@ngx-translate/core';
import { AbstractControl } from '@angular/forms';


export class ErrorCodes {
  constructor(private translateService: TranslateService) {

  }

  public static Error404 ='http://127.0.0.1:6666/api/';

  public static set(key:string) {
    return "";
  }

  static get f(): { [key: string]: AbstractControl } {
    return {};
  }
}
