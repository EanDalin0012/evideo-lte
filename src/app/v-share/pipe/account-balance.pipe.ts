import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountBalance'
})
export class AccountBalancePipe implements PipeTransform {

  transform(value: number, currency: string): string {
    if(value) {
      if(currency === 'KH') {
        return (value)+"".replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
      return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
      return "0";
    }
  }

}
