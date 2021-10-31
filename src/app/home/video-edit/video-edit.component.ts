import { FileUploadService } from './../../v-share/service/file-upload.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { HTTPResponseCode, LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../v-share/util/utils.static';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit, OnDestroy {

  @ViewChild("title") inputTitle: any;
  @ViewChild("stateMovie") inputStateMovie: any;
  @ViewChild("state") inputState: any;
  @ViewChild("fileSource") inputFileSource: any;

  selectedFiles: any  ;
  currentFile: any ;
  progress = 0;
  errorMsg = '';
  sourceId: number = 0;
  baseUrl: string = '';
  changeFile = false;
  // baseUrl: string = '';

  submitted = false;
  // selectedFiles?: FileList;
  // currentFile?: File;
  // progress = 0;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;
  fileName: string = '';

  public form: any;

  lstMovies: any[] = [];
  lstSubMovieType: any[] = [];
  jsonData: any;

  showEditImage = false;
  isSelectedFile = false;
  oldSourceId = 0;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private router: Router,
    private uploadService: FileUploadService
  ) {
    this.baseUrl = environment.bizServer.server;

    this.form as FormGroup;

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      stateMovie: ['', [Validators.required]],
      state: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      fileSource: new FormControl('', [Validators.required]),
    });

    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }

  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.VdSourceEdit);
  }

  ngOnInit() {
    const data = Utils.getSecureStorage(LOCAL_STORAGE.VdSourceEdit);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);

    this.form.patchValue({
      title: this.jsonData.vdName,
      remark: this.jsonData.remark,
    });

    this.inquiry();
    this.inquirySubMovieType();
    this.sourceId = this.jsonData.resourceId;
    this.oldSourceId = this.sourceId;
    if(this.sourceId > 0) {
      this.changeFile = true;
      this.imageSrc = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.sourceId;
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  update() {

    this.submitted = true;
    if(this.f.title.errors) {
      this.inputTitle.nativeElement.focus();
    } else if(this.f.stateMovie.errors) {
      this.inputStateMovie.nativeElement.focus();
    } else if (this.f.state.errors) {
      this.inputState.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();
      let jsonData = {
        id: this.jsonData.id,
        vdId: data.stateMovie.id,
        subVdTypeId: data.state.id,
        vdName: data.title,
        remark: data.remark,
        sourceId: this.sourceId,
        oldSourceId: this.oldSourceId
      };


      console.log(jsonData);
      const api = '/api/video/v0/update';
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.toastr.info(this.translate.instant('video.message.udpated'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
          this.router.navigate(['/home']);
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
          this.lstMovies.forEach( (element, index) => {
            if(element.id === this.jsonData.vdTypeId) {
              this.form.patchValue({
                stateMovie: this.lstMovies[index]
              });
            }
          });
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
        this.lstSubMovieType.forEach( (element, index) => {
          if(element.id === this.jsonData.vdSubTypeId) {
            this.form.patchValue({
              state: this.lstSubMovieType[index]
            });
          }
        });
      }
    });
  }

  showErrMsg(msgKey: string, value?: any){
      let message = '';
      switch(msgKey) {
        case 'invalidVdId':
          message = this.translate.instant('video.message.movieRequired');
          break;
        case 'invalidSubVdTypeId':
            message = this.translate.instant('video.message.typeRequired');
            break;
        case 'invalidVdName':
          message = this.translate.instant('video.message.titleRequired');
          break;
        case 'invalidFileImage':
          message = this.translate.instant('video.message.imageRequired');
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
      this.changeFile = false;
    }

    upload(): void {
      this.errorMsg = '';

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (file) {
          this.currentFile = file;

          this.uploadService.upload(this.currentFile,  '', 'LstVideo').subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.changeFile = true;
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
