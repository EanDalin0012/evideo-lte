import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../v-share/service/file-upload.service';
import { MyLogUtil } from '../../v-share/util/my-log-util';
import { DataService } from '../../v-share/service/data.service';
import { Utils } from 'src/app/v-share/util/utils.static';
import { LOCAL_STORAGE } from 'src/app/v-share/constants/common.const';
import { EncryptionUtil } from 'src/app/v-share/util/encryption-util';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {


  @ViewChild("movieType") inputMovieType: any;

  submitted: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;
  jsonData: any;
  movies: any[] = [];

  public form: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private uploadService: FileUploadService,
    private dataService: DataService,
  ) {
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);

    this.form as FormGroup;
    this.inputMovieType as ElementRef;

    this.form = this.formBuilder.group({
      movieType: ['', [Validators.required]],
      remark: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.Setting_Movie_Add);
  }

  ngOnInit() {

    const data = Utils.getSecureStorage(LOCAL_STORAGE.Setting_Movie_Add);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);

    this.form.patchValue({
      movieType: this.jsonData.name,
      remark: this.jsonData.remark
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

  save() {
    this.submitted = true;
    console.log(this.submitted, this.f.movieType.errors);

    if(this.f.movieType.errors) {
      this.inputMovieType.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();
      MyLogUtil.log('data', data);
      console.log(this.imageSrc);
      this.toastr.info("Movie type is added", "Success",{
        timeOut: 5000,
      });
    }

  }
}
