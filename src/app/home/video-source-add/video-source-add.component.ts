import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../v-share/service/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MyLogUtil } from '../../v-share/util/my-log-util';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-source-add',
  templateUrl: './video-source-add.component.html',
  styleUrls: ['./video-source-add.component.css']
})
export class VideoSourceAddComponent implements OnInit, OnDestroy {

  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;

  movies: any[] = [];
  jsonData: any;
  public form: any;
  url: any;
  format: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private uploadService: FileUploadService,
    private router: Router
  ) {
    this.form as FormGroup;
  }
  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.ToAddMovieSource);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      part: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      fileSource: new FormControl('', [Validators.required]),
    });
    this.movies = [
      {
        id: 1,
        value: 'Khmer',
        code: 'kh'
      },
      {
        id: 2,
        value: 'Thai',
        code: 'thai'
      },
      {
        id: 3,
        value: 'Koran',
        code: 'koran'
      },
      {
        id: 4,
        value: 'Chiness',
        code: 'ch'
      }
    ];

    const data = Utils.getSecureStorage(LOCAL_STORAGE.ToAddMovieSource);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    console.log('decyptionString', decryptString);

    this.form.patchValue({
      state: this.movies[0]
    });
    this.form.patchValue({
      stateMovie: this.movies[0]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submitCompany() {
    const data = this.form.getRawValue();
    MyLogUtil.log('data', data);
    // this.toastr.success("Company Settings is added", "Success",{
    //   timeOut: 9000,
    // });
    // this.toastr.error("Company Settings is added", "Success",{
    //   timeOut: 3000,
    // });

    this.toastr.info("Company Settings is added", "Success",{
      timeOut: 3000,
    });

    if (this.form.valid) {
      this.toastr.success("Company Settings is added", "Success");
    }
  }

  selectFile(event: any): void {
    const file = event.target.files && event.target.files[0];
    this.currentFile = event.target.files[0];
    console.log(this.currentFile);
    console.log(this.currentFile?.name.split('.'));

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
        console.log('url', this.url);

      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

  save() {
    console.log('url', this.url);
    const data = this.form.getRawValue();
    MyLogUtil.log('data', data);
  }

}
