import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value:string): unknown {
    const format = 'dddd, MMMM D, YYYY';
    if(value) {
      const dateArr = value.split(" ");
      if(dateArr[0] && dateArr[1]) {
        return moment(dateArr[0]).format(format) + ' '+dateArr[1];
      } else {
       return  moment(dateArr[0]).format(format);
      }
    }
    return null;
  }

}
