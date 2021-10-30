import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HTTPResponseCode } from './../../v-share/constants/common.const';
import { HTTPService } from './../../v-share/service/http.service';
import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE } from 'src/app/v-share/constants/common.const';
import { Utils } from 'src/app/v-share/util/utils.static';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo:any;
  private baseUrl: string = '';
  src: string = '';
  roleName: string = '';
  createAt: string = '';

  constructor(
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private titleService: Title,
    private toastr: ToastrService,
  ) {
    this.titleService.setTitle( "Users-Profile" );
    this.baseUrl = environment.bizServer.server;
  }

  ngOnInit(): void {
    this.userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    console.log(this.userInfo);
    this.src = this.baseUrl + '/unsecur/api/image/reader/v0/read/'+this.userInfo?.resourceId;
    if(this.userInfo) {
      this.loadUserById();
    }
  }

  loadUserById() {
    const api = '/api/user/v0/loadUserById';
    const jsonData = {
      userId: this.userInfo.id
    };

    this.hTTPService.Post(api, jsonData).then(response => {
      console.log(response);

      if(response.result.responseCode === HTTPResponseCode.Success) {
        this.roleName = response.body.roleName;
        this.createAt = response.body.createAt;
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
