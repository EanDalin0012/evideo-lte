import { Component, OnInit } from '@angular/core';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HTTPResponseCode } from '../../v-share/constants/common.const';
import { id } from '../../../assets/all-modules-data/id';

@Component({
  selector: 'app-client-vd-setting',
  templateUrl: './client-vd-setting.component.html',
  styleUrls: ['./client-vd-setting.component.css']
})
export class ClientVdSettingComponent implements OnInit {

  lstMovies: any[] = [];
  moviesIdCheked = 1;
  activeTabMovieId = 0;

  lstSubMovieType: any[] = [];
  lstMovieDetail: any[] = [];

  vdParts: any[] = [];
  vdPartId = 0;

  constructor(
    private dataService: DataService,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) {
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }

  ngOnInit(): void {
    this.inquiry();
    this.inquirySubMovieType();
  }

  onChecke(item: any, status: string) {
    console.log('item', item, status);
    console.log('activeTabMovieId', this.activeTabMovieId);
    let yN = "";
    if(status === 'Y') {
      yN = 'N';
    }
    if (status === 'N') {
      yN = 'Y';
    }
    const jsonData = {
      vdId: this.activeTabMovieId,
      subVdTypeId: item.id,
      status: yN
    };
    console.log('jsonData', jsonData);
    const api = '/api/movie-detail/v0/create';
    this.hTTPService.Post(api, jsonData).then(response => {
      if(response.result.responseCode === HTTPResponseCode.Success) {
        this.toastr.info(this.translate.instant('clientVdSetting.message.settingClientVideoMenuUpdate', {value: status}), this.translate.instant('common.label.success'),{
          timeOut: 5000,
        });
      } else {
        this.showErrMsg(response.result.responseMessage);
      }
    });

  }

  updateStatusYN(item: any) {
    console.log(item);
    let status = "";
    if(item.status === 'Y') {
      status = 'N';
    }
    if(item.status === 'N') {
      status = 'Y';
    }
    if(item && status !== '') {
      const api = '/api/movie-type/v0/updateStatusYN';
      const jsonData = {
        id: item.id,
        status: status
      };

      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          this.toastr.info(this.translate.instant('clientVdSetting.message.settingClientVideoMenuUpdate', {value: status}), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
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
        this.activeTabMovieId = this.lstMovies[0].id;
        this.inquirySubMovieDt(this.activeTabMovieId);
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
        console.log('lstSubMovieType',this.lstSubMovieType);

      }
    });
  }

  // Get Employee  Api Call
  inquirySubMovieDt(activeTabMovieId: number) {
    const jsonData = {
      vdId: activeTabMovieId
    };

    const api = '/api/movie-detail/v0/read';
    this.hTTPService.Post(api, jsonData).then(response => {
      console.log('inquirySubMovieDt', response);

      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      } else {
        this.lstMovieDetail = response.body;
        console.log('this.lstMovieDetail', this.lstMovieDetail);

      }
    });
  }

  tabChange(item: any) {
    this.activeTabMovieId = item.id;
    this.inquirySubMovieDt(this.activeTabMovieId);
  }

  showErrMsg(msgKey: string, value?: any){
    let message = '';
    switch(msgKey) {
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

export const movieTypes = [
  {
    id: 1,
    name: 'Drama',
    check: 'Y',
    remark: ''
  },
  {
    id: 2,
    name: 'Movie',
    check: 'Y',
    remark: ''
  },
  {
    id: 3,
    name: 'Histories',
    remark: ''
  }
]
