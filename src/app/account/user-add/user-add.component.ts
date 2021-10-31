import { environment } from 'src/environments/environment';
import { FileUploadService } from './../../v-share/service/file-upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { HTTPResponseCode } from '../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  @ViewChild("userName") inputUserName: any;
  @ViewChild("password") inputPassword: any;
  @ViewChild("confirmPassword") inputConfirmPassword: any;
  @ViewChild("dateBirth") inputDateBirth: any;
  @ViewChild("phoneNumber") inputPhoneNumber: any;
  @ViewChild("roleState") inputRoleState: any;
  @ViewChild("fullName") inputFullName: any;
  @ViewChild("gender") inputGender: any;

  selectedFiles: any  ;
  currentFile: any ;
  progress = 0;
  errorMsg = '';
  sourceId: number = 0;
  baseUrl: string = '';

  submitted = false;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;
  fileName: string = '';

  public form: any;
  selectedFile = false;
  lstMovies: any[] = [];
  lstSubMovieType: any[] = [];
  lstRole: any[] = [];
  genders: any[] = [];

  authorizationModule:any[] = [];
  checkUserAvailable = false;
  phoneNumberCheck = true;
  checkPw          = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private router: Router,
    private uploadService: FileUploadService,
  ) {
    this.form as FormGroup;
    this.baseUrl = environment.bizServer.server;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
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

    // this.inquiry();
    // this.inquirySubMovieType();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

    // return;
    this.submitted = true;
    if(this.f.fullName.errors) {
      this.inputFullName.nativeElement.focus();
    } if(this.f.gender.errors) {
      this.inputFullName.nativeElement.focus();
    } else if(this.f.userName.errors) {
      this.inputUserName.nativeElement.focus();
    } else if(this.f.password.errors) {
      this.inputPassword.nativeElement.focus();
    } else if (this.f.confirmPassword.errors) {
      this.inputConfirmPassword.nativeElement.focus();
    } else if (this.f.dateBirth.errors) {
      this.inputDateBirth.nativeElement.focus();
    } else if (data.phoneNumber == '') {
      this.phoneNumberCheck = true;
      this.inputPhoneNumber.nativeElement.focus();
    } else if (this.f.roleState.errors) {
      this.inputRoleState.nativeElement.focus();
    } else {
      const password = data.password;
      const confirmPassword = data.confirmPassword;
      if(password !== confirmPassword) {
        this.checkPw = true;
        this.inputPassword.nativeElement.focus();
      } else {
        let onSchedule = '';
        if(data.onSchedule !== '') {
          const format = 'YYYY-MM-DD';
          onSchedule = moment(data.dateBirth).format(format).toString();
        }

        let jsonData = {
          fullName: data.fullName.trim(),
          gender: data.gender.name.trim(),
          userName: data.userName.trim(),
          password: data.password.trim(),
          dateBirth: onSchedule,
          phoneNumber: data.phoneNumber.trim(),
          roleId: data.roleState.id,
          authorizationModule: this.authorizationModule,
          remark: data.remark,
          address: data.address,
          sourceId: this.sourceId
        };

        console.log('jsonData',jsonData);
        // return;
        const api = '/api/user/v0/create';
        this.hTTPService.Post(api, jsonData).then(response => {
          if(response.result.responseCode === HTTPResponseCode.Success) {
            this.toastr.info(this.translate.instant('users.message.added'), this.translate.instant('common.label.success'),{
              timeOut: 5000,
            });
            this.router.navigate(['/account']);
          } else {
            this.showErrMsg(response.result.responseMessage);
          }
        });

      }


      // console.log(this.imageSrc);
    }
  }

    // Get Movie Type  Api Call
    inquiry() {
      const api = '/api/movie-type/v0/read';
      this.hTTPService.Get(api).then(response => {
        if(response.result.responseCode !== HTTPResponseCode.Success) {
          this.showErrMsg(response.result.responseMessage);
       }else {
          this.lstMovies = response.body;
        }
      });
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


  onFocusOut(event: any) {
    console.log(event.target.value);
    if(event.target.value.trim() !== '') {
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


    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      this.progress = 0;
      const file: File | null = this.selectedFiles.item(0);
      this.currentFile = file;
      this.errorMsg = '';
    }

    upload(): void {
      this.errorMsg = '';

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (file) {
          this.currentFile = file;

          this.uploadService.upload(this.currentFile,  '', 'Profile').subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {

                if(event.body?.result.responseCode === HTTPResponseCode.Success) {
                  this.sourceId = event.body.body.sourceId;
                  this.imageSrc = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.sourceId;
                } else {
                  if(event.body?.result.responseMessage === 'videoSourceNameReadyHave') {
                    this.errorMsg = this.translate.instant('videoSource.message.videoSourceNameReadyHave');
                  } else {
                    this.errorMsg = event.body?.result.responseMessage;
                  }

                }
              }
              console.log('sourceId', this.sourceId);

            },
            (err: any) => {
              if (err.error && err.error.responseMessage) {
                this.errorMsg = err.error.responseMessage;
              } else {
                this.errorMsg = 'Error occurred while uploading a file!';
              }

              this.currentFile = undefined;
            });
        }

        this.selectedFiles = undefined;
      }
    }

}
