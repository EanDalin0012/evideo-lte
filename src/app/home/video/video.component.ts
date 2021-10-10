import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { EncryptionUtil } from 'src/app/v-share/util/encryption-util';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE, HTTPResponseCode } from '../../v-share/constants/common.const';
declare const $: any;
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef } from 'ag-grid-community';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { SrcImgComponent } from '../../v-share/component/src-img/src-img.component';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  lstMovies: any[] = [];
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
  disabled = true;
  onFocusInt = false;

  lstSearch: any[] =[];
  search: string  = '';
  searchTr = false;

  constructor(
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private hTTPService: HTTPService,
    private translate: TranslateService
  ) {

    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[3]);

  }

  ngOnInit() {
    this.dataService.currentMessageBody.subscribe(message => {
      console.log('message', message);

      if(this.search !== '') {
        this.onFocusOutEvent(this.search);

        this.searchTr = false;
      }
      this.onFocusInt = false;
    });

    this.columnDefs = [
      {
        headerName: '#',
        field: 'id',
        cellClass: 'id'
      },
      {
        headerName: this.translate.instant('common.label.settingClientVideoMenu'),
        field: 'status',
        cellRenderer: 'srcImg',
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: this.translate.instant('common.label.name'),
        field: 'vdName'
      },
      {
        headerName: this.translate.instant('common.label.name'),
        field: 'vdTypeName'
      },
      {
        headerName: this.translate.instant('common.label.name'),
        field: 'vdSubTypeIdName'
      },
      {
        headerName: this.translate.instant('common.label.remark'),
        field: 'remark',
      }
    ];

    this.frameworkComponents = {
      srcImg: SrcImgComponent
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

    Utils.removeSecureStorage(LOCAL_STORAGE.ToLstMovieSource);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.inquiry();
  }

  onFocusOut(event:any) {
    // this.onFocusInt = false;
  }

  // Get Movie Type  Api Call
  inquiry() {
    const api = '/api/video/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
     }else {
        this.lstMovies = response.body;
        this.rowData =this.lstMovies;
        console.log(this.lstMovies);

      }
    });
  }

  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    if(selectedRows) {
      this.disabled = false;
    }
  }

  searchChange(event:any): void {
    console.log('event',event);

    if (event) {
     const search = this.lstMovies.filter( data => data.vdName.toLowerCase().includes(event.target.value));
     this.rowData = search;
    }
  }

  onFocusEvent(event: any){
    this.onFocusInt = true;
    this.searchTr = true;
    // console.log('onFocusEvent', event.target.value);
    // this.dataService.unsubscribeBodyEvent();
    const data = Utils.getSecureStorage(LOCAL_STORAGE.SearchHistoryVideo);
    if(data) {
      const decryptSearch = EncryptionUtil.decrypt(data);
      this.lstSearch = JSON.parse(decryptSearch);
      console.log(this.lstSearch);
    }




    // console.log('searchs', searchs);
    // if(searchs) {
    //   const decryptSearch = EncryptionUtil.decrypt(searchs);
    //   console.log('decryptSearch', decryptSearch);

    // } else {
    //   const jsonData = [{
    //     search: event.target.value
    //   }];
    //   const jsonString = JSON.stringify(jsonData);
    //   const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
    //   console.log('item', item);
    //   Utils.setSecureStorage(LOCAL_STORAGE.SearchHistoryVideo, item);
    //   console.log('onFocusOutEvent', event.target.value);
    // }
 }

 searchHistoryClick(item: any) {
  this.onFocusInt = false;
  this.search = item.search;
  const search = this.lstMovies.filter( data => data.vdName.toLowerCase().includes(this.search));
  this.rowData = search;
}

expression() {
  console.log('expression');

}
  onFocusOutEvent(value: string){
    const searchs = Utils.getSecureStorage(LOCAL_STORAGE.SearchHistoryVideo);
    let jsonData = [];
    let jsonArr = [];
    if(searchs) {
      const decryptSearch = EncryptionUtil.decrypt(searchs);
      jsonArr = JSON.parse(decryptSearch);
      console.log(jsonArr.length);

      const search = jsonArr.filter( (data:any) => data.search.toLowerCase() === (value));
      if(search.length === 0 && value.trim() !== '') {
        jsonArr.push(
          {
            search: value
          }
        );
        const jsonString = JSON.stringify(jsonArr);
        const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
        console.log('jsonData', jsonArr);
        Utils.setSecureStorage(LOCAL_STORAGE.SearchHistoryVideo, item);

      }
    } else {
      if(value !== '') {
        jsonData.push(
          {
            search: value
          }
        );
        const jsonString = JSON.stringify(jsonData);
        const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
        Utils.setSecureStorage(LOCAL_STORAGE.SearchHistoryVideo, item);
      }
    }
 }

  newMovie() {
    this.router.navigate(['/home/vd-add']);
  }
  // Add holidays Modal Api Call



  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value:any) {
    console.log('value', value, JSON.stringify(value));
    const jsonString = JSON.stringify(value);
    const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
    console.log('item', item);

    Utils.setSecureStorage(LOCAL_STORAGE.MOVEI_Edit, item);
    this.router.navigate(['/home/vd-edit']);

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  toMovieSource(item:any) {
    console.log('value', item, JSON.stringify(item));
    const jsonString = JSON.stringify(item);
    const encryptString = EncryptionUtil.encrypt(jsonString.toString()).toString();
    console.log('item', encryptString);

    Utils.setSecureStorage(LOCAL_STORAGE.ToLstMovieSource, encryptString);
    this.router.navigate(['/home/vd-source']);
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
