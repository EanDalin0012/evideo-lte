import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
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

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: any;
  public dtOptions: DataTables.Settings = {};

  lstMovies: any[] = [];
  jsonData:any;

  url: any = "holidays";
  public tempId: any;
  public editId: any;

  public rows:any[] = [];
  public srch:any[] = [];
  public statusValue: any;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addHolidayForm: any;
  public editHolidayForm: any;
  public editHolidayDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private translate: TranslateService,
    private hTTPService: HTTPService,
  ) {

    this.baseUrl = environment.bizServer.server;

    this.dtElement as DataTableDirective;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitParamRouterChange(url[3]);
  }

  ngOnInit() {
    this.loadholidays();
    const data = Utils.getSecureStorage(LOCAL_STORAGE.VdSource);
    const decryptString = EncryptionUtil.decrypt(data);
    this.jsonData = JSON.parse(decryptString);
    console.log('decyptionString', decryptString);
    this.src = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.jsonData.resourceId;

    this.inquiry();

    this.columnDefs = [
      {
        headerName: '#',
        field: 'id', minWidth: 50, width: 50},
      {
        headerName: this.translate.instant('common.label.name'),
        field: 'name'
      },
      {
        headerName: this.translate.instant('common.label.remark'),
        field: 'remark',
      },
      {
        headerName: this.translate.instant('common.label.settingClientVideoMenu'),
        field: 'status',
        cellClass: 'text-center'
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
    this.dtTrigger.unsubscribe();
    // Utils.removeSecureStorage(LOCAL_STORAGE.ToLstMovieSource);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.inquiry();
  }

  // Get Movie Type  Api Call
  inquiry() {
    const api = '/api/movie-type/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
      }else {
        this.lstMovies = response.body;
        this.rowData =this.lstMovies;
      }
    });
  }

  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    if(selectedRows) {
      this.disabled = false;
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
    console.log('event',event);

    if (event) {
     const search = this.lstMovies.filter( data => data.vdName.toLowerCase().includes(event.target.value));
     this.rowData = search;
    }
  }

  // Get Employee  Api Call
  loadholidays() {
    this.lstMovies = movieSources;
    this.dtTrigger.next();
    this.rows = this.lstMovies;
    this.srch = [...this.rows];
    // this.srvModuleService.get(this.url).subscribe((data) => {
    // });
  }

  // Add holidays Modal Api Call

  addholidays() {
    if (this.addHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.addHolidayForm.value.Holidaydate,
        "dd-MM-yyyy"
      );
      let obj = {
        title: this.addHolidayForm.value.HolidayName,
        holidaydate: holiday,
        day: this.addHolidayForm.value.DaysName,
      };
      // this.srvModuleService.add(obj, this.url).subscribe((data) => {
      //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //     dtInstance.destroy();
      //   });
      // });
      this.loadholidays();
      $("#add_holiday").modal("hide");
      this.addHolidayForm.reset();
      this.toastr.success("Holidays added", "Success");
    }
  }

  from(data:any) {
    this.editHolidayDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit holidays Modal Api Call

  editHolidays() {
    if (this.editHolidayForm.valid) {
      let obj = {
        title: this.editHolidayForm.value.editHolidayName,
        holidaydate: this.editHolidayDate,
        day: this.editHolidayForm.value.editDaysName,
        id: this.editId,
      };
      // this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //     dtInstance.destroy();
      //   });
      // });
      this.loadholidays();
      $("#edit_holiday").modal("hide");
      this.toastr.success("Holidays Updated succesfully", "Success");
    }
  }

  // Delete holidays Modal Api Call

  deleteHolidays() {
    // this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
    //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     dtInstance.destroy();
    //   });
    //   this.loadholidays();
    //   $("#delete_holiday").modal("hide");
    //   this.toastr.success("Holidays Deleted", "Success");
    // });
  }

  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value:any) {
    this.editId = value;
    const index = this.lstMovies.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstMovies[index];
    this.editHolidayForm.setValue({
      editHolidayName: toSetValues.title,
      editHolidayDate: toSetValues.holidaydate,
      editDaysName: toSetValues.day,
    });
  }

  addMovieSource() {
    console.log('value', this.jsonData, JSON.stringify(this.jsonData));
    const jsonString = JSON.stringify(this.jsonData);
    const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
    console.log('item', item);
    Utils.setSecureStorage(LOCAL_STORAGE.ToAddMovieSource, item);
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

export const movieSources = [
  {
    id: 1,
    part: 1,
    end: 'N',
    createAt: '01-01-2020',
    remark: "Khmer",
  },
  {
    id: 2,
    part: 2,
    end: 'N',
    createAt: '01-01-2020',
    remark: "Thai",
  },
  {
    id: 3,
    part: 3,
    end: 'N',
    createAt: '01-01-2020',
    remark: "Chiness",
  },
  {
    id: 4,
    part: 4,
    end: 'N',
    createAt: '01-01-2020',
    remark: "Korean",
  },
  {
    id: 5,
    part: 5,
    end: 'Y',
    createAt: '01-01-2020',
    remark: "HoliFood",
  },
];
