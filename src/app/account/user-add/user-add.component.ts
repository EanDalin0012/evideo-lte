import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { HTTPResponseCode, AuthorizationModule } from '../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';

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


  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;
  fileName: string = '';

  public form: any;

  lstMovies: any[] = [];
  lstSubMovieType: any[] = [];

  authorizationModule = AuthorizationModule;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
  ) {
    this.form as FormGroup;

    const url = (window.location.href).split('/');
    console.log(url);

    this.dataService.visitParamRouterChange(url[4]);
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      roleState: ['', [Validators.required]],

      checkUserRead: [false, [Validators.required]],
      checkUserCreate: [false, [Validators.required]],
      checkUserEdit: [false, [Validators.required]],
      checkUserDelete: [false, [Validators.required]],

      checkMovieRead: [false, [Validators.required]],
      checkMovieCreate: [false, [Validators.required]],
      checkMovieEdit: [false, [Validators.required]],
      checkMovieDelete: [false, [Validators.required]],

      checkMovieSourceRead: [false, [Validators.required]],
      checkMovieSourceCreate: [false, [Validators.required]],
      checkMovieSourceEdit: [false, [Validators.required]],
      checkMovieSourceDelete: [false, [Validators.required]],

      checkSettingMovieTypeRead: [false, [Validators.required]],
      checkSettingMovieTypeCreate: [false, [Validators.required]],
      checkSettingMovieTypeEdit: [false, [Validators.required]],
      checkSettingMovieTypeDelete: [false, [Validators.required]],

      checkSettingMovieSubTypeRead: [false, [Validators.required]],
      checkSettingMovieSubTypeCreate: [false, [Validators.required]],
      checkSettingMovieSubTypeEdit: [false, [Validators.required]],
      checkSettingMovieSubTypeDelete: [false, [Validators.required]],

      checkSettingClentSettingRead: [false, [Validators.required]],
      checkSettingClentSettingCreate: [false, [Validators.required]],
      checkSettingClentSettingEdit: [false, [Validators.required]],
      checkSettingClentSettingDelete: [false, [Validators.required]],

      remark: ['', [Validators.required]],
      fileSource: new FormControl('', [Validators.required])
    });

    // this.inquiry();
    // this.inquirySubMovieType();
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
      }
    }
  }

  save() {
    const data1 = this.form.getRawValue();

    console.log(data1);


    this.submitted = true;
    if(this.f.userName.errors) {
      this.inputUserName.nativeElement.focus();
    } else if(this.f.password.errors) {
      this.inputPassword.nativeElement.focus();
    } else if (this.f.confirmPassword.errors) {
      this.inputConfirmPassword.nativeElement.focus();
    } else if (this.f.dateBirth.errors) {
      this.inputDateBirth.nativeElement.focus();
    } else if (this.f.phoneNumber.errors) {
      this.inputPhoneNumber.nativeElement.focus();
    } else if (this.f.roleState.errors) {
      this.inputRoleState.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();

      const jsonData = {
        userName: data.userName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateBirth: data.dateBirth,
        phoneNumber: data.phoneNumber,
        roleState: data.roleState.id,

        userReadId: data.checkUserRead ? AuthorizationModule.Movie_Read: 0,
        userCreateId: data.checkUserCreate ? AuthorizationModule.User_Create: 0,
        userEditId: data.checkUserEdit ? AuthorizationModule.User_Update: 0,
        userDeleteId: data.checkUserEdit ? AuthorizationModule.User_Create: 0,

        remark: data.remark,
        fileInfo: {
          fileBits: this.imageSrc,
          fileName: this.fileName.split('.')[0],
          fileExtension: this.fileName.split('.')[1],
        }

      };
      return;
      const api = '/api/video/v0/create';
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.toastr.info(this.translate.instant('video.message.added'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
          this.form = this.formBuilder.group({
            title: '',
            stateMovie: '',
            state: '',
            remark: '',
            fileSource: '',
          });
          this.imageSrc = '';
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
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

  // Get Employee  Api Call
  inquirySubMovieType() {
    const api = '/api/sub-movie-type/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      } else {
        this.lstSubMovieType = response.body;
      }
    });
  }

  showErrMsg(msgKey: string, value?: any){
      let message = '';
      switch(msgKey) {
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
