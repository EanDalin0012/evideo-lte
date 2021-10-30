import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      if (value.length === 10) {
        const formateValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        return formateValue;
      } else if (value.length === 9) {
        const formateValue = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        return formateValue;
      }
    }
    return value;
  }

}
