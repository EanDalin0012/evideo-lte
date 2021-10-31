import { environment } from './../../../environments/environment';
import { FileUploadService } from './../../v-share/service/file-upload.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE, HTTPResponseCode } from '../../v-share/constants/common.const';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { DataService } from '../../v-share/service/data.service';
import * as moment from 'moment';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-source-add',
  templateUrl: './video-source-add.component.html',
  styleUrls: ['./video-source-add.component.css']
})
export class VideoSourceAddComponent implements OnInit, OnDestroy {


  @ViewChild("title") inputTitle: any;
  @ViewChild("part") inputPart: any;
  @ViewChild("state") inputState: any;
  @ViewChild("fileSource") inputFileSource: any;


  selectedFiles: any  ;
  currentFile: any ;
  progress = 0;
  errorMsg = '';
  videoSourceId: number = 0;
  videoSrc: string = '';
  baseUrl: string = '';

  submitted = false;
  imageSrc: string = '';
  changeFile = false;
  jsonData: any;
  public form: any;
  format: string = '';
  part: number = 0;

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
    this.selectedFiles as FileList  ;
    this.currentFile as File ;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[3]);
  }

  ngOnDestroy(): void {
    // Utils.removeSecureStorage(LOCAL_STORAGE.videoSourceAdd);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: [{value: '', disabled: true}, Validators.required],
      part: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      onSchedule: ['', [Validators.required]],
      isEnd:[false, [Validators.required]]
    });

    const data = Utils.getSecureStorage(LOCAL_STORAGE.videoSourceAdd);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    this.inquiryPart(this.jsonData.id);

    this.form.patchValue({
      title: this.jsonData.vdName
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  inquiryPart(vdId: number) {
    const api = '/api/videoSource/v0/requestPart';
    const jsonData = {
      vdId: vdId
    };

    this.hTTPService.Post(api, jsonData).then(response => {
      if(response.result.responseCode === HTTPResponseCode.Success) {
          this.part = response.body.part;
          this.form.patchValue({
            part: this.part
          });
      } else {
        this.showErrMsg(response.result.responseMessage);
      }
    });
  }

  save() {

    this.submitted = true;
    if(this.f.title.errors) {
      this.inputTitle.nativeElement.focus();
    } else if(this.f.part.errors) {
      this.inputPart.nativeElement.focus();
    } else if (this.videoSourceId === 0) {
      this.inputFileSource.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();

      let endYn = "N";
      if(data.isEnd === true) {
        endYn = "Y";
      }

      let onSchedule = '';
      if(data.onSchedule !== '') {
        const format = 'YYYY-MM-DD';
        onSchedule = moment(data.onSchedule).format(format).toString();
      }

      const jsonData = {
        isEnd: endYn,
        vdId: this.jsonData.id,
        vdName: this.jsonData.vdName,
        videoSourcePart: data.part,
        videoSourceOnSchedule: onSchedule,
        remark: data.remark,
        videoSourceId: this.videoSourceId
      };

      const api = '/api/videoSource/v0/create';
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.router.navigate(['/home/vd-source']);
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
    }
  }

  showErrMsg(msgKey: string, value?: any){
    let message = '';
    switch(msgKey) {
      case 'invalidVdId':
        message = this.translate.instant('video.label.movieRequired');
        break;
        case 'invalidVideoSourcePart':
          message = this.translate.instant('videoSource.message.partRequired');
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
    this.changeFile = false;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, this.jsonData.vdName, 'LstVideoSource').subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.changeFile = true;
              if(event.body?.result.responseCode === HTTPResponseCode.Success) {
                this.videoSourceId = event.body.body.sourceId;
                this.videoSrc = this.baseUrl+"/unsecur/api/resource/vd/v0/vdSource/"+this.videoSourceId;
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
