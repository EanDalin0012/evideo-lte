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

  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileName: string = '';

  jsonData: any;
  jsonDataEdit: any;

  public form: any;
  url: any;
  format: string = '';
  part: number = 0;

  selectVd = false;

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
    console.log(this.jsonDataEdit);

    this.form.patchValue({
      title: this.jsonData.vdName,
      part: this.jsonDataEdit.part,
      onSchedule: this.jsonDataEdit.scheduleEnable,
      isEnd: this.jsonDataEdit.isEnd === 'Y' ? true : false,
      remark: this.jsonDataEdit.remark ? this.jsonDataEdit.remark : ''
    });
    this.url = environment.bizServer.server+"/unsecur/api/resource/vd/v0/vdSource/"+this.jsonDataEdit.sourceVdId;
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
      this.selectVd = true;
    }
  }

  update() {
    console.log(this.jsonDataEdit.sourceVdId);

    this.submitted = true;
    if(this.f.title.errors) {
      this.inputTitle.nativeElement.focus();
    } else if(this.f.part.errors) {
      this.inputPart.nativeElement.focus();
    } else if(this.selectVd && this.f.fileSource.errors) {
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
        selectVd: this.selectVd
      };

      if(this.selectVd === true) {
        jsonData = {
          id: this.jsonDataEdit.id,
          isEnd: data.isEnd === true ? 'Y': 'N',
          vdId: this.jsonData.id,
          vdName: this.jsonData.vdName,
          videoSourcePart: data.part,
          videoSourceOnSchedule: onSchedule,
          remark: data.remark,
          sourceVdId: this.jsonDataEdit.sourceVdId,
          selectVd: this.selectVd,
          fileInfo: {
            fileBits: this.url,
            fileName: fileName,
            fileExtension: this.fileName.split('.')[1],
          }
        };
      }

      console.log(jsonData);
      // return;

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

}
