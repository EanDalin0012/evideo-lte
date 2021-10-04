import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if(value === 'm') {
      return "Male";
    } else if (value === 'f') {
      return 'Female';
    }
    return 'Other';
  }

}
