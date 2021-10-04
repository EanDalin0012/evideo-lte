import { Account } from '../model/account';
import { AccountTypeCode, LOCAL_STORAGE } from '../constants/common.const';
import { Router } from '@angular/router';
import { Utils } from './utils.static';
export class SubAccountRoutorUtil {

  constructor(private router: Router) {
    this.router = router as Router;
  }

  public subAccountRouter(item: Account) {
    console.log(item);
    switch (item.accountType) {
      case AccountTypeCode.Seniar:
        Utils.setSecureStorage(LOCAL_STORAGE.SubAccountSenair, item);
        this.router.navigate(['/acc/sub-account-senair']);
        break;
      case AccountTypeCode.Master:
        Utils.setSecureStorage(LOCAL_STORAGE.SubAccountMaster, item);
        this.router.navigate(['/acc/sub-account-master']);
        break;
      case AccountTypeCode.Agent:
        Utils.setSecureStorage(LOCAL_STORAGE.SubAccountAgent, item);
        this.router.navigate(['/acc/sub-account-agent']);
        break;
      case AccountTypeCode.Member:
        Utils.setSecureStorage(LOCAL_STORAGE.SubAccountMember, item);
        this.router.navigate(['/acc/sub-account-member']);
        break;
    }

  }

}
