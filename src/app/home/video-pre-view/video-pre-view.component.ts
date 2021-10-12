import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { EncryptionUtil } from '../../v-share/util/encryption-util';

@Component({
  selector: 'app-video-pre-view',
  templateUrl: './video-pre-view.component.html',
  styleUrls: ['./video-pre-view.component.css']
})
export class VideoPreViewComponent implements OnInit,OnDestroy {

  jsonData: any;
  src: string = '';
  baseUrl: string = '';
  itemInfo: any;
  videoSrc: string = '';
  constructor() {
    this.baseUrl = environment.bizServer.server;
  }
  ngOnDestroy(): void {
    Utils.removeSecureStorage(LOCAL_STORAGE.VdSourcePreview);
  }

  ngOnInit(): void {
    const data = Utils.getSecureStorage(LOCAL_STORAGE.VdSourcePreview);
    const decryptString = EncryptionUtil.decrypt(data);
    const dataInfo = JSON.parse(decryptString);
    this.jsonData = dataInfo.jsonData;
    this.itemInfo = dataInfo.itemInfo;
    console.log('jsonData', this.jsonData);
    console.log('itemInfo', this.itemInfo);

    this.src = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.jsonData.resourceId;
    this.videoSrc = this.baseUrl+"/unsecur/api/resource/vd/v0/vdSource/"+this.itemInfo.sourceVdId;
  }

}
