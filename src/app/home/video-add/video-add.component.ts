import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../v-share/service/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MyLogUtil } from '../../v-share/util/my-log-util';
import { DataService } from '../../v-share/service/data.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit, OnDestroy {

  submitted = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;

  movies: any[] = [];
  subMovies: any[] = [];

  public form: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private uploadService: FileUploadService,
    private dataService: DataService,
  ) {
    this.form as FormGroup;

    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      stateMovie: ['', [Validators.required]],
      state: ['', [Validators.required]],
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

    this.subMovies = [
      {
        id: 1,
        value: 'Drama'
      },
      {
        id: 2,
        value: 'Movie'
      },
      {
        id: 2,
        value: 'Histories'
      }
    ];

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
    this.currentFile = event.target.files[0];
    console.log('file name', this.currentFile, this.currentFile?.name, this.currentFile?.lastModified);
    console.log(this.currentFile?.name.split('.'));


    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
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
    const data = this.form.getRawValue();
    MyLogUtil.log('data', data);
    console.log(this.imageSrc);

  }


}
