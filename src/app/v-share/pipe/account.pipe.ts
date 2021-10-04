import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'account'
})
export class AccountPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length == 9 ) {
      const pipe0 = value.substr(0, 3);
      const pipe1 = value.substr(3, 3);
      const pipe2 = value.substr(6, 3);
      return pipe0 + '-'+pipe1+'-'+pipe2;
    } else {
      return value;
    }

  }

}
