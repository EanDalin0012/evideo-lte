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

  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileName: string = '';

  jsonData: any;
  public form: any;
  url: any;
  format: string = '';
  part: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
  ) {
    this.form as FormGroup;
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
      isEnd:[false, [Validators.required]],
      fileSource: new FormControl('', [Validators.required]),
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

  selectFile(event: any): void {
    const file = event.target.files && event.target.files[0];
    this.currentFile = event.target.files[0];
    this.fileName = this.currentFile?.name ? this.currentFile?.name : '';
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
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
    } else if(this.f.fileSource.errors) {
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
        fileInfo: {
          fileBits: this.url,
          fileName: this.fileName.split('.')[0],
          fileExtension: this.fileName.split('.')[1],
        }
      };
      const api = '/api/videoSource/v0/create';
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.url = '';
          this.submitted = false;
          this.form.patchValue({
            part: '',
            remark: '',
            onSchedule: '',
            isEnd: false,
            fileSource: '',
          });
          this.inquiryPart(this.jsonData.id);
          this.toastr.info(this.translate.instant('video.message.added'), this.translate.instant('common.label.success'),{
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

}
