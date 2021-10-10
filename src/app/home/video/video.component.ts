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
    if (event) {
     const search = this.lstMovies.filter( data => data.name.toLowerCase().includes(event.target.value));
     this.rowData = search;
    }
  }
  onFocusEvent(event: any){
    this.onFocusInt = true;
    console.log('onFocusEvent', event.target.value);

 }

  onFocusOutEvent(event: any){
    this.onFocusInt = false;
    console.log('onFocusOutEvent', event.target.value);

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

export const holidays = [
  {
    id: 1,
    title: "New Year",
    createAt: "01-01-2020",
    remark: "sun day",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 2,
    title: "Diwali",
    createAt: "28-02-2020",
    remark: "Thursday ",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 3,
    title: "Christmas",
    createAt: "28-02-2020",
    remark: "Friday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 4,
    title: "Ramzon",
    createAt: "17-02-2020",
    remark: "sun day",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 5,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 6,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 7,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 8,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 9,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 10,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 11,
    title: "Bakrid",
    createAt: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
];

