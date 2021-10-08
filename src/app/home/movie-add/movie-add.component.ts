import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../v-share/service/file-upload.service';
import { MyLogUtil } from '../../v-share/util/my-log-util';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { environment } from '../../../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  private baseUrl: string = '';

  @ViewChild("movieType") inputMovieType: any;

  submitted: boolean = false;
  public form: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
  ) {
    this.baseUrl = environment.bizServer.server;
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
  }

  ngOnInit() {
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
      const api = '/api/movie-type/v0/create';
      const jsonData = {
        name: data.movieType,
        remark: data.remark
      };

      this.hTTPService.Post(api, jsonData).then(response => {
        console.log('response', response);

        if(response.result.responseCode === '200') {
          this.toastr.info("Movie type is added", "Success",{
            timeOut: 5000,
          });
          this.form = this.formBuilder.group({
            movieType: '',
            remark: ''
          });
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });

    }
  }


  showErrMsg(msgKey: string){
    let message = '';
    switch(msgKey) {
      case 'Invalid_Name':
        message = this.translate.instant('Movie.Message.MovieTypeRequired');
        break;
      case '500':
        message = this.translate.instant('serverResponseCode.label.server_Error');
        break;
      default:
        message = this.translate.instant('serverResponseCode.label.unknown');
        break;
    }
    this.toastr.error(message, "Error",{
      timeOut: 5000,
    });
  }

}
