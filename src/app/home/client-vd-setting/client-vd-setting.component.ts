import { id } from './../../../assets/all-modules-data/id';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../v-share/service/data.service';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HTTPResponseCode } from '../../v-share/constants/common.const';

@Component({
  selector: 'app-client-vd-setting',
  templateUrl: './client-vd-setting.component.html',
  styleUrls: ['./client-vd-setting.component.css']
})
export class ClientVdSettingComponent implements OnInit {

  videoTypes: any[] = [];
  videoSubTypes: any[] = [];
  videoTypeDts: any[] = [];

  videoType:any;
  video_sub_type_elements:any[] = [];

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
    this.inquiryVideoTypes();
  }

  onChecke(item: any, status: string) {
    console.log('item', item, status);
    console.log('activeTabMovieId', this.videoType.id);
    let yN = "";
    if(status === 'Y') {
      yN = 'N';
    }
    if (status === 'N') {
      yN = 'Y';
    }
    const jsonData = {
      vdId: this.videoType.id,
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
          this.inquiryVideoTypes();
          this.toastr.info(this.translate.instant('clientVdSetting.message.settingClientVideoMenuUpdate', {value: status}), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
    }
  }


  inquiryVideoTypes() {
    const api = '/api/client-setting/v0/read';
    this.hTTPService.Get(api).then(response => {
      console.log('response abc', response);

      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
     }else {

        this.videoTypes = response.body.video_types;
        this.videoTypeDts = response.body.video_type_dts;
        this.videoSubTypes = response.body.video_sub_types;
        console.log(this.videoType);
        if(!this.videoType) {
          this.videoType = this.videoTypes[0];
        }
        // this.videoType = this.videoTypes[0];
        // this.activeTabVideoId = this.videoType.id;
        this.reset();
      }
    });
  }

  reset() {
    this.video_sub_type_elements = [];
    this.videoSubTypes.forEach(element => {
      const checked = this.tReturn(element.id);
      this.video_sub_type_elements.push({
        checked: checked,
        name: element.name,
        video_sub_type_id: element.id
      });
    });
  }

  tReturn(id: number) {
    let check = false;
    this.videoTypeDts.forEach(element => {
      if(this.videoType.id === element.id) {
        let video_sub_types:any[] = [];
        video_sub_types = element.video_sub_types;
        if(video_sub_types.length > 0) {
          video_sub_types.forEach(item => {
            if(item.sub_video_id === id) {
              check = true;
            }
          });
        }
      }
    });
    return check;
  }

  checkValue(event: any, item:any) {
    console.log(event.target.checked, item, this.videoType);
    if(event.target.checked === true) {

    }

    const json = {
      checked: event.target.checked,
      videoTypeId: this.videoType.id,
      videoSubTypeId: item.video_sub_type_id
    };
    console.log(json);
    const api = '/api/client-setting/v0/updateVideoTypeDt';
    this.hTTPService.Post(api, json).then(response => {
      if(response.result.responseCode === HTTPResponseCode.Success) {
        this.inquiryVideoTypes();
        // this.toastr.info(this.translate.instant('clientVdSetting.message.settingClientVideoMenuUpdate', {value: status}), this.translate.instant('common.label.success'),{
        //   timeOut: 5000,
        // });
      } else {
        this.showErrMsg(response.result.responseMessage);
      }
    });
  }




  tabChange(item: any) {
    this.videoType = item;
    this.reset();
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
