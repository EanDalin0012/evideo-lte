import { Pipe, PipeTransform } from '@angular/core';
import { AccountTypeCode } from '../constants/common.const';

@Pipe({
  name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value) {
      case AccountTypeCode.Admin:
        return '<span class="badge bg-inverse-danger">Admin</span>';
      case AccountTypeCode.Seniar:
        return '<span class="badge bg-inverse-danger">Seniar</span>';'Seniar';
      case AccountTypeCode.Master:
        return '<span class="badge bg-inverse-danger">Master</span>';'Master';
      case AccountTypeCode.Agent:
        return '<span class="badge bg-inverse-danger">Agent</span>';'Agent';
      case AccountTypeCode.Member:
        return '<span class="badge bg-inverse-danger">Member</span>';'Member';
    }
    return null;
  }

}
