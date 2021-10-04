import { environment } from "src/environments/environment";

export class MyLogUtil {
  public static log(message?: any, ...optionalParams: any[]) {
    environment.production ? (() => '')() : console.log(message, optionalParams);
  }
}
