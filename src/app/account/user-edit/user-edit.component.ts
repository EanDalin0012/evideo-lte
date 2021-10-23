import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { AuthorizationModule, HTTPResponseCode, LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Utils } from '../../v-share/util/utils.static';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @ViewChild("userName") inputUserName: any;
  @ViewChild("password") inputPassword: any;
  @ViewChild("confirmPassword") inputConfirmPassword: any;
  @ViewChild("dateBirth") inputDateBirth: any;
  @ViewChild("phoneNumber") inputPhoneNumber: any;
  @ViewChild("roleState") inputRoleState: any;
  @ViewChild("fullName") inputFullName: any;
  @ViewChild("gender") inputGender: any;


  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = 'http://localhost:8080/unsecur/api/image/reader/v0/read/1';
  fileInfos?: Observable<any>;
  fileName: string = '';

  public form: any;
  selectedFile = false;
  lstMovies: any[] = [];
  lstRole: any[] = [];
  genders: any[] = [];

  authorizationModule:any[] = [];
  checkUserAvailable = false;
  phoneNumberCheck = true;
  checkPw          = false;
  jsonData:any;

  // 1
  User_Read_Check   = false;
  User_Create_Check = false;
  User_Update_Check = false;
  User_Delete_Check = false;
// 2
  Movie_Read_Check     = false;
  Movie_Create_Check   = false;
  Movie_Update_Check   = false;
  Movie_Delete_Check   = false;
// 3
  Movie_Source_Read_Check     = false;
  Movie_Source_Create_Check   = false;
  Movie_Source_Update_Check   = false;
  Movie_Source_Delete_Check   = false;
// 4

  Setting_Movie_Type_Read_Check   = false;
  Setting_Movie_Type_Create_Check = false;
  Setting_Movie_Type_Update_Check = false;
  Setting_Movie_Type_Delete_Check = false;

// 5
  Setting_Sub_Movie_Type_Read_Check   = false;
  Setting_Sub_Movie_Type_Create_Check = false;
  Setting_Sub_Movie_Type_Update_Check = false;
  Setting_Sub_Movie_Type_Delete_Check = false;

// 6
  Setting_Client_Setting_Read_Check   = false;
  Setting_Client_Setting_Create_Check = false;
  Setting_Client_Setting_Update_Check = false;
  Setting_Client_Setting_Delete_Check = false;

  id =0 ;
  baseUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.form as FormGroup;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }

  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.UserEdit);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      roleState: ['', [Validators.required]],
      address:['', [Validators.required]],
      remark: ['', [Validators.required]],
      fileSource: new FormControl('', [Validators.required])
    });

    this.inquiryRoles();
    this.authorizationModule = [];
    this.genders = [
      {
        id: 1,
        name: 'Male'
      },
      {
        id: 2,
        name: 'Female'
      }
    ];

    const data = Utils.getSecureStorage(LOCAL_STORAGE.UserEdit);
    const decryptString = EncryptionUtil.decrypt(data);
    console.log('jsonData',decryptString);
    this.jsonData = JSON.parse(decryptString);
    if(this.jsonData) {
      this.inquiry(this.jsonData.id);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  selectFile(event: any): void {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.currentFile = event.target.files[0];
      this.fileName = this.currentFile?.name ? this.currentFile?.name : '';
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.selectedFile = true;
      }
    }
  }

  checkEvent(event: any, id: number) {
    if(event.target.checked) {
      const search = this.authorizationModule.filter( data => data.id === id);
      if(search.length == 0) {
        this.authorizationModule.push({
          id: id
        });
      }
    } else {
      this.authorizationModule.forEach((element, index) => {
        if(element.id === id) {
          this.authorizationModule.splice(index,1);
        }
      });
    }
    console.log(this.authorizationModule);

  }

  phoneNumberChange(event:any) {
    console.log(event.target.value);
    this.phoneNumberCheck = event.target.value != '' ? false : true;
  }

  save() {
    const data = this.form.getRawValue();
    console.log(this.f.phoneNumber.errors);
    console.log('data.phoneNumber', data.phoneNumber);

    // return;
    this.submitted = true;
    if(this.f.fullName.errors) {
      this.inputFullName.nativeElement.focus();
    } if(this.f.gender.errors) {
      this.inputFullName.nativeElement.focus();
    } else if(this.f.userName.errors) {
      this.inputUserName.nativeElement.focus();
    } else if (this.f.dateBirth.errors) {
      this.inputDateBirth.nativeElement.focus();
    } else if (data.phoneNumber == '') {
      this.phoneNumberCheck = true;
      this.inputPhoneNumber.nativeElement.focus();
    } else if (this.f.roleState.errors) {
      this.inputRoleState.nativeElement.focus();
    } else {

        let onSchedule = '';
        if(data.onSchedule !== '') {
          const format = 'YYYY-MM-DD';
          onSchedule = moment(data.dateBirth).format(format).toString();
        }

        let jsonData = {};
        jsonData = {
          id: this.jsonData.id,
          fullName: data.fullName.trim(),
          gender: data.gender.name.trim(),
          userName: data.userName.trim(),
          dateBirth: onSchedule,
          phoneNumber: data.phoneNumber.trim(),
          roleId: data.roleState.id,
          authorizationModule: this.authorizationModule,
          remark: data.remark,
          address: data.address,
          resourceId: this.jsonData.resourceId ? this.jsonData.resourceId : 0,
          selectedFile: this.selectedFile
        };
        if(this.selectedFile === true ) {
          jsonData = {
            id: this.jsonData.id,
            fullName: data.fullName.trim(),
            gender: data.gender.name.trim(),
            userName: data.userName.trim(),
            password: data.password.trim(),
            dateBirth: onSchedule,
            phoneNumber: data.phoneNumber,
            roleId: data.roleState.id,
            authorizationModule: this.authorizationModule,
            remark: data.remark,
            address: data.address,
            selectedFile: this.selectedFile,
            resourceId: this.jsonData.resourceId ? this.jsonData.resourceId : 0,
            fileInfo: {
              fileBits: this.imageSrc,
              fileName: this.fileName.split('.')[0],
              fileExtension: this.fileName.split('.')[1],
            }
          };
        }
        console.log(jsonData);

        const api = '/api/user/v0/update';
        this.hTTPService.Post(api, jsonData).then(response => {
          if(response.result.responseCode === HTTPResponseCode.Success) {
            this.toastr.info(this.translate.instant('users.message.udpated'), this.translate.instant('common.label.success'),{
              timeOut: 5000,
            });
            this.router.navigate(['/account']);
          } else {
            this.showErrMsg(response.result.responseMessage);
          }
        });


      // console.log(this.imageSrc);
    }
  }

    // Get Movie Type  Api Call
    inquiry(userId: number) {
      const jsonData = {
        userId: userId
      };
      const api = '/api/user/v0/loadUserById';
        this.hTTPService.Post(api, jsonData).then(response => {
          console.log('response', response, response?.body.result);
          console.log(response.body.gender);
          let selectedGender = {};
          let selectedRole = {};
          if(this.genders[0].name === this.jsonData.gender) {
            selectedGender = this.genders[0];
          }
          if(this.genders[1].name === this.jsonData.gender) {
            selectedGender = this.genders[1];
          }

          this.lstRole.forEach(element => {
            if(element.id === this.jsonData.roleId) {
              selectedRole = this.lstRole[0];
            }
          });

          if(response.result.responseCode === HTTPResponseCode.Success) {
            this.id = response.body.id;
            this.form.patchValue({
              fullName: this.jsonData.fullName,
              userName: this.jsonData.userName,
              dateBirth: this.jsonData.dateBirth,
              phoneNumber: response.body.phoneNumber,
              roleState: selectedRole,
              address: this.jsonData.address,
              gender: selectedGender,
            });

            this.authorizationModule = response.body.authorities;
            this.authorizationModule.forEach(element => {
              this.swichAuthorization(element.id);
            });
            this.imageSrc = environment.bizServer.server+"/unsecur/api/image/reader/v0/read/"+this.jsonData.resourceId;
          } else {
            this.showErrMsg(response.result.responseMessage);
          }
        });
    }

    swichAuthorization(id: number) {
        switch(id) {
          case AuthorizationModule.User_Read:
            this.User_Read_Check = true;
            break;
          case AuthorizationModule.User_Create:
            this.User_Create_Check = true;
            break;
          case AuthorizationModule.User_Update:
            this.User_Update_Check = true;
            break;
          case AuthorizationModule.User_Delete:
            this.User_Delete_Check = true;
            break;
          case AuthorizationModule.Movie_Read:
            this.Movie_Read_Check = true;
            break;
          case AuthorizationModule.Movie_Create:
            this.Movie_Create_Check = true;
            break;
          case AuthorizationModule.Movie_Update:
            this.Movie_Update_Check = true;
            break;
          case AuthorizationModule.Movie_Delete:
            this.Movie_Delete_Check = true;
            break;
          case AuthorizationModule.Movie_Source_Read:
            this.Movie_Source_Read_Check = true;
            break;
          case AuthorizationModule.Movie_Source_Create:
            this.Movie_Source_Create_Check = true;
            break;
          case AuthorizationModule.Movie_Source_Update:
            this.Movie_Source_Update_Check = true;
            break;
          case AuthorizationModule.Movie_Source_Delete:
            this.Movie_Source_Delete_Check = true;
            break;
          case AuthorizationModule.Setting_Movie_Type_Read:
            this.Setting_Movie_Type_Read_Check = true;
            break;
          case AuthorizationModule.Setting_Movie_Type_Create:
            this.Setting_Movie_Type_Create_Check = true;
            break;
          case AuthorizationModule.Setting_Movie_Type_Update:
            this.Setting_Movie_Type_Update_Check = true;
            break;
          case AuthorizationModule.Setting_Movie_Type_Delete:
            this.Setting_Movie_Type_Delete_Check = true;
            break;
          case AuthorizationModule.Setting_Sub_Movie_Type_Read:
            this.Setting_Sub_Movie_Type_Read_Check = true;
            break;
          case AuthorizationModule.Setting_Sub_Movie_Type_Create:
            this.Setting_Sub_Movie_Type_Create_Check = true;
            break;
          case AuthorizationModule.Setting_Sub_Movie_Type_Update:
            this.Setting_Sub_Movie_Type_Update_Check = true;
            break;
          case AuthorizationModule.Setting_Sub_Movie_Type_Delete:
            this.Setting_Sub_Movie_Type_Delete_Check = true;
            break;
          case AuthorizationModule.Setting_Client_Setting_Read:
            this.Setting_Client_Setting_Read_Check = true;
            break;
          case AuthorizationModule.Setting_Client_Setting_Create:
            this.Setting_Client_Setting_Create_Check = true;
            break;
          case AuthorizationModule.Setting_Client_Setting_Update:
            this.Setting_Client_Setting_Update_Check = true;
            break;
          case AuthorizationModule.Setting_Client_Setting_Delete:
            this.Setting_Client_Setting_Delete_Check = true;
            break;
        }
    }
  // Get Employee  Api Call
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


  onFocusOut(event: any) {
    console.log(event.target.value);
    if(event.target.value.trim() !== '' && event.target.value.trim() !== this.jsonData.userName.trim()) {
      let jsonData = {
        userName: event.target.value
      };
      const api = '/api/user/v0/checkUserName';
          this.hTTPService.Post(api, jsonData).then(response => {
            console.log(response);
            this.checkUserAvailable = false;
            if(response.result.responseCode === HTTPResponseCode.Found) {
              this.checkUserAvailable = true;
            }
          });
    }

  }

  showErrMsg(msgKey: string, value?: any){
      let message = '';
      switch(msgKey) {

        case 'userReadyHave':
          message = this.translate.instant('serverResponseCode.label.serverError');
          break;
        case 'invalidVdId':
          message = this.translate.instant('video.label.movieRequired');
          break;
        case 'invalidSubVdTypeId':
            message = this.translate.instant('video.label.typeRequired');
            break;
        case 'invalidVdName':
          message = this.translate.instant('video.label.titleRequired');
          break;
        case 'invalidFileImage':
          message = this.translate.instant('video.label.imageRequired');
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
