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

  baseUrl: string = '';

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
  jsonData: any;

  showEditImage = false;
  isSelectedFile = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private router: Router,
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
  }

  ngOnInit() {
    const data = Utils.getSecureStorage(LOCAL_STORAGE.VdSourceEdit);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    console.log('jsonData',this.jsonData);

    this.form.patchValue({
      title: this.jsonData.vdName,
      remark: this.jsonData.remark,
    });

    this.inquiry();
    this.inquirySubMovieType();
    this.imageSrc = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.jsonData.resourceId;
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
      this.isSelectedFile = true;
    }
  }

  update() {
    this.submitted = true;
    console.log('isSelectedFile', this.isSelectedFile);

    if(this.f.title.errors) {
      this.inputTitle.nativeElement.focus();
    } else if(this.f.stateMovie.errors) {
      this.inputStateMovie.nativeElement.focus();
    } else if (this.f.state.errors) {
      this.inputState.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();
      let jsonData = {};
      if(this.isSelectedFile) {
        jsonData = {
          id: this.jsonData.id,
          vdId: data.stateMovie.id,
          subVdTypeId: data.state.id,
          vdName: data.title,
          remark: data.remark,
          isSelectedFile: this.isSelectedFile,
          fileInfo: {
            fileBits: this.imageSrc,
            fileName: this.fileName.split('.')[0],
            fileExtension: this.fileName.split('.')[1],
          }
        };
      } else {
        jsonData = {
          id: this.jsonData.id,
          vdId: data.stateMovie.id,
          subVdTypeId: data.state.id,
          vdName: data.title,
          remark: data.remark,
          isSelectedFile: this.isSelectedFile,
          sourceId: this.jsonData.resourceId
        };
      }

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
