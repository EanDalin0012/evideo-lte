import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE, HTTPResponseCode } from '../../v-share/constants/common.const';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
declare const $: any;
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef } from 'ag-grid-community';
import { TranslateService } from '@ngx-translate/core';
import { HTTPService } from '../../v-share/service/http.service';
import { ArgBtnComponent } from '../../v-share/component/arg-btn/arg-btn.component';
@Component({
  selector: 'app-video-source',
  templateUrl: './video-source.component.html',
  styleUrls: ['./video-source.component.css']
})
export class VideoSourceComponent implements OnInit, OnDestroy {

  baseUrl: string = '';
  src: string = '';
  srcVd = 'https://vjs.zencdn.net/v/oceans.mp4';
  disabled = true;
  search: string = '';

  pagination = true;
  paginationPageSize = 20;
  gridApi:any;
  gridColumnApi :any;
  public modules: any[] = AllCommunityModules;
  frameworkComponents: any;
  defaultColDef: any;
  columnDefs: ColDef[] = [];
  rowData: any;
  rowSelection: any;
  isRowSelectable: any;

  lstVideoSource: any[] = [];
  jsonData:any;

  constructor(
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private translate: TranslateService,
    private hTTPService: HTTPService,
  ) {

    this.baseUrl = environment.bizServer.server;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[3]);
  }

  ngOnInit() {
    const data = Utils.getSecureStorage(LOCAL_STORAGE.VdSource);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    this.src = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.jsonData.resourceId;

    this.inquiry();

    this.columnDefs = [
      {
        headerName: '#',
        field: 'id', minWidth: 50, width: 50},
      {
        headerName: this.translate.instant('videoSource.label.part'),
        field: 'part'
      },
      {
        headerName: this.translate.instant('videoSource.label.videoIsEnd'),
        field: 'isEnd'
      },
      {
        headerName: this.translate.instant('videoSource.label.videoEnableOn'),
        field: 'scheduleEnable'
      },
      {
        headerName: this.translate.instant('common.label.remark'),
        field: 'remark',
      }
    ];

    this.frameworkComponents = {
      argBtn: ArgBtnComponent
    };

    this.defaultColDef = {
      editable: false,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };

    this.rowSelection = 'multiple';
    this.isRowSelectable = function (rowNode: any) {
      return rowNode.data;
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // Utils.removeSecureStorage(LOCAL_STORAGE.ToLstMovieSource);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.inquiry();
  }

  // Get videoSource Type  Api Call
  inquiry() {
    const api = '/api/videoSource/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      }else {
        this.lstVideoSource = response.body;
        this.rowData =this.lstVideoSource;
      }
    });
  }

  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    if(selectedRows) {
      this.disabled = false;
    }
  }

  onCellDoubleClicked(event:any) {
    if(event) {
      console.log(this.lstVideoSource[event.rowIndex]);
      const jsonString = JSON.stringify(this.lstVideoSource[event.rowIndex]);
      const encryptString = EncryptionUtil.encrypt(jsonString.toString()).toString();
      Utils.setSecureStorage(LOCAL_STORAGE.VdSource, encryptString);
      // this.router.navigate(['home/vd-source']);
    }
  }


  onFocusEvent(event: any){
    // this.onFocusInt = true;
    // this.searchTr = true;
    // console.log('onFocusEvent', event.target.value);
    // this.dataService.unsubscribeBodyEvent();
    const data = Utils.getSecureStorage(LOCAL_STORAGE.SearchHistoryVideo);
    if(data) {
      // const decryptSearch = EncryptionUtil.decrypt(data);
      // this.lstSearch = JSON.parse(decryptSearch);
      // console.log(this.lstSearch);
  }
}


  searchChange(event:any): void {
    if (event) {
     const search = this.lstVideoSource.filter( data => data.vdName.toLowerCase().includes(event.target.value));
     this.rowData = search;
    }
  }

  addMovieSource() {
    console.log(this.jsonData);
    const jsonString = JSON.stringify(this.jsonData);
    const item = EncryptionUtil.encrypt(jsonString).toString();
    Utils.setSecureStorage(LOCAL_STORAGE.videoSourceAdd, item);
    this.router.navigate(['/home/vd-source-add']);
  }

  showErrMsg(msgKey: string, value?: any){
    let message = '';
    switch(msgKey) {
      case 'Invalid_Name':
        message = this.translate.instant('movie.message.movieTypeRequired');
        break;
      case 'Invalid_Vd_Id':
        message = this.translate.instant('serverResponseCode.label.inValidMovieTypeIdWithValue', {value: value});
        break;

      case 'Invalid_Vd_ID':
        message = this.translate.instant('serverResponseCode.label.inValidMovieTypeId');
        break;
      case 'unSelectRow':
        message = this.translate.instant('common.message.unSelectRow');
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
