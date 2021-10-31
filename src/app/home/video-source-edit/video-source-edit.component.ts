import { FileUploadService } from './../../v-share/service/file-upload.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE, HTTPResponseCode } from '../../v-share/constants/common.const';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { DataService } from '../../v-share/service/data.service';
import * as moment from 'moment';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { GeneratePasswordUtils } from '../../v-share/util/generate-password-util';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-source-edit',
  templateUrl: './video-source-edit.component.html',
  styleUrls: ['./video-source-edit.component.css']
})
export class VideoSourceEditComponent implements OnInit, OnDestroy {


  @ViewChild("title") inputTitle: any;
  @ViewChild("part") inputPart: any;
  @ViewChild("state") inputState: any;
  @ViewChild("fileSource") inputFileSource: any;

  selectedFiles: any  ;
  currentFile: any ;
  progress = 0;
  errorMsg = '';
  videoSourceId: number = 0;
  oldVideoSourceId = 0;
  videoSrc: string = '';
  baseUrl: string = '';
  changeFile = false;

  submitted = false;
  // selectedFiles?: FileList;
  // currentFile?: File;
  // progress = 0;
  message = '';
  imageSrc: string = '';
  fileName: string = '';

  jsonData: any;
  jsonDataEdit: any;

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
    this.form as FormGroup;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[3]);
  }

  ngOnDestroy(): void {
    // Utils.removeSecureStorage(LOCAL_STORAGE.videoSourceAdd);
    Utils.removeSecureStorage(LOCAL_STORAGE.videoSourceEdit);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: [{value: '', disabled: true}, Validators.required],
      part: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      onSchedule: ['', [Validators.required]],
      isEnd:[false, [Validators.required]],
      fileSource: new FormControl('', [Validators.required]),
    });

    const data = Utils.getSecureStorage(LOCAL_STORAGE.videoSourceAdd);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    // this.inquiryPart(this.jsonData.id);

    const dataEdit = Utils.getSecureStorage(LOCAL_STORAGE.videoSourceEdit);
    const decryptStringEdit = EncryptionUtil.decrypt(dataEdit);
    this.jsonDataEdit = JSON.parse(decryptStringEdit);

    this.form.patchValue({
      title: this.jsonData.vdName,
      part: this.jsonDataEdit.part,
      onSchedule: this.jsonDataEdit.scheduleEnable,
      isEnd: this.jsonDataEdit.isEnd === 'Y' ? true : false,
      remark: this.jsonDataEdit.remark ? this.jsonDataEdit.remark : ''
    });
    this.videoSourceId = this.jsonDataEdit.sourceVdId;
    this.oldVideoSourceId = this.videoSourceId;
    if(this.videoSourceId > 0) {
      this.changeFile = true;
      this.videoSrc = environment.bizServer.server+"/unsecur/api/resource/vd/v0/vdSource/"+this.videoSourceId;
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  update() {
    this.submitted = true;
    if(this.f.title.errors) {
      this.inputTitle.nativeElement.focus();
    } else if(this.f.part.errors) {
      this.inputPart.nativeElement.focus();
    } else if(this.videoSourceId <= 0) {
      this.inputFileSource.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();

      let onSchedule = '';
      if(data.onSchedule !== '') {
        const format = 'YYYY-MM-DD';
        onSchedule = moment(data.onSchedule).format(format).toString();
      }

      let fileName = this.fileName.split('.')[0].replace(/[^a-zA-Z ]/g, "");
      if(fileName === '') {
        fileName = GeneratePasswordUtils.generate(8);
      }

      let jsonData = {};

      jsonData  = {
        id: this.jsonDataEdit.id,
        isEnd: data.isEnd === true ? 'Y': 'N',
        vdId: this.jsonData.id,
        vdName: this.jsonData.vdName,
        videoSourcePart: data.part,
        videoSourceOnSchedule: onSchedule,
        remark: data.remark,
        sourceVdId: this.jsonDataEdit.sourceVdId,
        videoSourceId: this.videoSourceId,
        oldVideoSourceId: this.oldVideoSourceId
      };

      const api = '/api/videoSource/v0/update';
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.router.navigate(['/home/vd-source']);
          this.toastr.info(this.translate.instant('videoSource.message.udpated'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
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
                this.videoSrc = environment.bizServer.server+"/unsecur/api/resource/vd/v0/vdSource/"+this.videoSourceId;
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
