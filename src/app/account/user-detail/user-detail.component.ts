import { environment } from './../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from './../../v-share/service/http.service';
import { EncryptionUtil } from './../../v-share/util/encryption-util';
import { LOCAL_STORAGE, HTTPResponseCode } from './../../v-share/constants/common.const';
import { Utils } from 'src/app/v-share/util/utils.static';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private baseUrl: string = '';
  jsonData:any;
  lstRole: any[] = [];
  role:any;

  src: string = '';
  roleName: string = '';
  createAt: string = '';
  jsonInfo:any;
  userInfo = {
    accountExpired: false,
    accountLocked: false,
    address: "",
    createDate: "",
    credentialsExpired: false,
    dateBirth: "",
    enabled: true,
    fullName: "",
    gender: "",
    id: 11,
    isFirstLogin: true,
    modifyBy: 1,
    modifyDate: "",
    phoneNumber: "",
    remark: "",
    resourceId: 0,
    roleId: 1,
    status: "",
    userName: "",
  };

  constructor(
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private titleService: Title,
    private toastr: ToastrService,
  ) {
    this.titleService.setTitle( "Users-Details" );
    this.baseUrl = environment.bizServer.server;
   }

  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.UserDetail);
  }

  ngOnInit(): void {
    this.inquiryRoles();
    const data = Utils.getSecureStorage(LOCAL_STORAGE.UserDetail);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);

    this.src = this.baseUrl + '/unsecur/api/image/reader/v0/read/'+this.jsonData?.resourceId;
    if(this.jsonData) {
      this.loadUserById();
    }

  }

  // Get Role  Api Call
  inquiryRoles() {
    const api = '/api/role/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      } else {
        this.lstRole = response.body;
      }
    });
  }

  loadUserById() {
    const api = '/api/user/v0/inquiryUserById/'+this.jsonData.id;
    const jsonData = {
      userId: this.jsonData.id
    };

    this.hTTPService.Get(api, jsonData).then(response => {

      if(response.result.responseCode === HTTPResponseCode.Success) {
        this.roleName = response.body.roleName;
        this.createAt = response.body.createAt;
        this.jsonInfo = response.body;

        if(this.lstRole.length > 0) {
          this.lstRole.forEach(element => {
            if(element.id === this.jsonInfo.roleId) {
              this.role = element;
            }
          });
        }

      } else {
        this.showErrMsg(response.result.responseMessage);
      }

    });

  }


  showErrMsg(msgKey: string, value?: any){
    let message = '';
    switch(msgKey) {
      case 'invalidUserId':
        message = this.translate.instant('users.message.invalidUserId');
        break;
      case 'invalidPassword':
        message = this.translate.instant('users.message.passwordRequired');
        break;
      case 'unSelectRow':
        message = this.translate.instant('common.message.unSelectRow');
        break;
      case '500':
        message = this.translate.instant('serverResponseCode.label.serverError');
        break;
      default:
        message = this.translate.instant('serverResponseCode.label.unknown');
        break;
    }
    this.toastr.error(message, this.translate.instant('common.label.error'),{
      timeOut: 5000,
    });
  }

}
