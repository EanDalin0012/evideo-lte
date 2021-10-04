import { Pipe, PipeTransform } from '@angular/core';
import { AccountTypeCode } from '../constants/common.const';

@Pipe({
  name: 'accountTypeCode'
})
export class AccountTypeCodePipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value) {
      case AccountTypeCode.Admin:
        return 'Admin';
      case AccountTypeCode.Seniar:
        return 'Seniar'; //Seniar';
      case AccountTypeCode.Master:
        return 'Master';
      case AccountTypeCode.Agent:
        return 'Agent';
      case AccountTypeCode.Member:
        return 'Member';
    }
    return null;
  }

}
