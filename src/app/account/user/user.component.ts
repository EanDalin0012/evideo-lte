import { PhoneNumberComponent } from './../../v-share/component/phone-number/phone-number.component';
import {  Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
declare const $: any;
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef } from 'ag-grid-community';
import { HTTPResponseCode, LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { StatusYNComponent } from '../../v-share/component/status-yn/status-yn.component';
import { SrcImgComponent } from '../../v-share/component/src-img/src-img.component';
import { EncryptionUtil } from '../../v-share/util/encryption-util';
import { Utils } from '../../v-share/util/utils.static';
import { Title } from '@angular/platform-browser';
import { StatusComponent } from '../../v-share/component/status/status.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // Add Modal
  submitted: boolean = false;
  public form: any;
  @ViewChild("password") inputPassword: any;
  @ViewChild("confirmPassword") inputConfirmPassword: any;


  selectedJson: any;

  lstUser: any[] = [];
  disabled = true;

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
  btnEnableTxt:string = '';
  enable = false;
  checkPw = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private hTTPService: HTTPService,
    private translate: TranslateService,
    private titleService: Title,
  ) {
    this.titleService.setTitle( "Users" );
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[3]);

    this.form as FormGroup;

    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

  }

  checked = false;

  ngOnInit() {
    this.btnEnableTxt = this.translate.instant('users.label.disableUser');
    this.inquiry();

    this.columnDefs = [
      {
        headerName: '#',
        field: 'id', minWidth: 50, width: 50
      },
      {
        headerName: this.translate.instant('video.label.image'),
        field: 'status',
        cellRenderer: 'srcImg',
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: this.translate.instant('users.label.userName'),
        field: 'userName'
      },
      {
        headerName: this.translate.instant('users.label.enable'),
        field: 'enabled',
        cellRenderer: 'status'
      },
      {
        headerName: this.translate.instant('users.label.fullName'),
        field: 'fullName'
      },
      {
        headerName: this.translate.instant('users.label.dateBirth'),
        field: 'dateBirth'
      },
      {
        headerName: this.translate.instant('users.label.gender'),
        field: 'gender'
      },
      {
        headerName: this.translate.instant('users.label.phoneNumber'),
        field: 'phoneNumber',
        cellRenderer: 'phoneNumber',
      },
      {
        headerName: this.translate.instant('common.label.remark'),
        field: 'remark',
      }
    ];

    this.frameworkComponents = {
      statusYN: StatusYNComponent,
      srcImg: SrcImgComponent,
      status: StatusComponent,
      phoneNumber: PhoneNumberComponent
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

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.inquiry();
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedJson = selectedRows[0];
    console.log(this.selectedJson);
    if(this.selectedJson.enabled === false) {
      this.btnEnableTxt = this.translate.instant('users.label.enableUser');
      this.enable = true;
    } else {
      this.btnEnableTxt = this.translate.instant('users.label.disableUser');
      this.enable = false;
    }
    if(selectedRows) {
      this.disabled = false;
    }
  }

  deleteShow() {
    if(this.selectedJson) {
      $("#delele").modal("show");
    }
  }

  onDelete() {
    const api = '/api/user/v0/delete';
      const jsonData = {
        userId: this.selectedJson.id
      };

      this.hTTPService.Post(api, jsonData).then(response => {

        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          $("#delele").modal("hide");
          this.toastr.info(this.translate.instant('users.message.deleted'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });

        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
  }

  onDiable() {
    const api = '/api/user/v0/enableStatus';
      const jsonData = {
        userId: this.selectedJson.id,
        enable: this.enable
      };

      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          $("#disableUser").modal("hide");
          if(this.enable === true) {
            this.toastr.info(this.translate.instant('users.message.enabledUser'), this.translate.instant('common.label.success'),{
              timeOut: 5000,
            });
          } else {
            this.toastr.info(this.translate.instant('users.message.disabledUser'), this.translate.instant('common.label.success'),{
              timeOut: 5000,
            });
          }
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
  }

  disableUser() {
    if(this.selectedJson) {
      $("#disableUser").modal("show");
    }
  }

  resetPW() {
    if(this.selectedJson) {
      $("#resetPW").modal("show");
    }
  }

  onResetPW() {
    this.submitted = true;
    if(this.f.password.errors) {
      this.inputPassword.nativeElement.focus();
    } else if(this.f.confirmPassword.errors) {
      this.inputConfirmPassword.nativeElement.focus();
    } else {
      const api = '/api/user/v0/changePassword';
      const data = this.form.getRawValue();
      const password = data.password;
      const confirmPassword = data.confirmPassword;
      if(password !== confirmPassword) {
        this.checkPw = true;
        this.inputPassword.nativeElement.focus();
      }
      const jsonData = {
        userId: this.selectedJson.id,
        password: password
      };

      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          $("#resetPW").modal("hide");
          this.toastr.info(this.translate.instant('users.message.userChangePassword'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
    }
  }

  // getSelectedRowData(note:string) {
  //   let selectedNodes = this.gridApi.getSelectedNodes();
  //   let selectedData = selectedNodes.map((node: { data: any; }) => node.data);
  //   this.selectedJson = selectedData[0];
  //   console.log(this.selectedJson);

  //   if(note === 'edit') {
  //     this.formEdit.patchValue({
  //       editMovieType: this.selectedJson.name,
  //       editRemark: this.selectedJson.remark
  //     });
  //     $("#edit_movie_type").modal("show");
  //   } else if (note === 'delete') {
  //     $("#delele").modal("show");
  //   }
  //   return selectedData;
  // }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  new() {
    this.router.navigate(['/account/user-add']);
  }

  edit1() {

    const jsonString = JSON.stringify(this.selectedJson);
    const encryptString = EncryptionUtil.encrypt(jsonString.toString()).toString();

    Utils.setSecureStorage(LOCAL_STORAGE.UserEdit, encryptString);
    this.router.navigate(['account/user-edit']);
  }

  save() {
    this.submitted = true;
    if(this.f.movieType.errors) {
      this.inputPassword.nativeElement.focus();
    } else {
      const data = this.form.getRawValue();
      const api = '/api/movie-type/v0/create';
      const jsonData = {
        name: data.movieType,
        remark: data.remark
      };
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          this.toastr.info(this.translate.instant('movie.message.added'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
          this.form = this.formBuilder.group({
            movieType: '',
            remark: ''
          });
          $("#add_movie_type").modal("hide");
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
    }
  }

  delete() {
    if (this.selectedJson.id) {
      const api = '/api/movie-type/v0/delete';
      const jsonData = {
        id: this.selectedJson.id
      };
      this.hTTPService.Post(api, jsonData).then(response => {
        if(response.result.responseCode === HTTPResponseCode.Success) {
          this.inquiry();
          this.disabled = true;
          $("#delele").modal("hide");
          this.toastr.info(this.translate.instant('movie.message.deleted'), this.translate.instant('common.label.success'),{
            timeOut: 5000,
          });
        } else {
          this.showErrMsg(response.result.responseMessage);
        }
      });
    } else {
      this.showErrMsg('Invalid_Vd_ID');
    }

  }

  // Get Movie Type  Api Call
  inquiry() {
    const api = '/api/user/v0/read';
    this.hTTPService.Get(api).then(response => {
      if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
     }else {
        this.lstUser = response.body;
        this.rowData =this.lstUser;
      }
    });
  }

  ngOnDestroy(): void {
  }

  searchChange(event:any): void {
    if (event) {
     const search = this.lstUser.filter( data => data.userName.toLowerCase().includes(event.target.value));
     this.rowData = search;
    }
  }

  onCellDoubleClicked(event:any) {
    if(event) {
      const jsonString = JSON.stringify(this.lstUser[event.rowIndex]);
      const encryptString = EncryptionUtil.encrypt(jsonString.toString()).toString();
      Utils.setSecureStorage(LOCAL_STORAGE.UserDetail, encryptString);
      this.router.navigate(['account/user-detail']);
    }
  }


  showErrMsg(msgKey: string, value?: any){
    let message = '';
    switch(msgKey) {
      case 'invalidUserId':
        message = this.translate.instant('users.message.invalidUserId');
        break;
      case 'invalidPassword':
        message = this.translate.instant('users.message.passwordRequired');
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
