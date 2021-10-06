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
  selector: 'app-movie-type-edit',
  templateUrl: './movie-type-edit.component.html',
  styleUrls: ['./movie-type-edit.component.css']
})
export class MovieTypeEditComponent implements OnInit {

  @ViewChild("subMovieType") inputSubMovieType: any;

  submitted: boolean = false;
  jsonData: any;
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
    this.inputSubMovieType as ElementRef;

    this.form = this.formBuilder.group({
      subMovieType: ['', [Validators.required]],
      remark: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    const data = Utils.getSecureStorage(LOCAL_STORAGE.Setting_Movie_Type_Edit);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    console.log('decyptionString', decryptString);
    this.form.patchValue({
      subMovieType: this.jsonData.name,
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

    if(this.f.subMovieType.errors) {
      this.inputSubMovieType.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();
      MyLogUtil.log('data', data);
      this.toastr.info("Movie type is added", "Success",{
        timeOut: 5000,
      });
    }
  }

}
