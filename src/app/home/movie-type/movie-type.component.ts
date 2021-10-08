import {  Component, OnInit, ElementRef } from '@angular/core';
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
import { ActionComponent } from '../../v-share/component/action/action.component';
import { HTTPResponseCode } from '../../v-share/constants/common.const';

@Component({
  selector: 'app-movie-type',
  templateUrl: './movie-type.component.html',
  styleUrls: ['./movie-type.component.css']
})
export class MovieTypeComponent implements OnInit {

 // Add Modal
 submitted: boolean = false;
 public form: any;
 @ViewChild("movieType") inputMovieType: any;

 // Edit Modal
 editSubmitted: boolean = false;
 public formEdit: any;
 @ViewChild("editMovieType") inputEditMovieType: any;

 selectedJson: any;

 lstMovies: any[] = [];
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

 constructor(
   private formBuilder: FormBuilder,
   private toastr: ToastrService,
   private dataService: DataService,
   private router: Router,
   private hTTPService: HTTPService,
   private translate: TranslateService
 ) {

   const url = (window.location.href).split('/');
   this.dataService.visitParamRouterChange(url[4]);

   this.form as FormGroup;
   this.formEdit as FormGroup;
   this.inputMovieType as ElementRef;
   this.inputEditMovieType as ElementRef;

   this.form = this.formBuilder.group({
     movieType: ['', [Validators.required]],
     remark: ['', [Validators.required]]
   });

   this.formEdit = this.formBuilder.group({
     editMovieType: ['', [Validators.required]],
     editRemark: ['', [Validators.required]]
   });

 }

 checked = false;

 ngOnInit() {

   this.inquiry();

   this.columnDefs = [
     {
       headerName: '#',
       field: 'id', minWidth: 50, width: 50},
     {
       headerName: this.translate.instant('common.label.name'),
       field: 'name' },
     {
       headerName: this.translate.instant('common.label.remark'),
       field: 'remark',
     }
   ];

   this.frameworkComponents = {
     medalCellRenderer: ActionComponent
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
   var selectedRows = this.gridApi.getSelectedRows();
   if(selectedRows) {
     this.disabled = false;
   }
 }

 getSelectedRowData(note:string) {
   let selectedNodes = this.gridApi.getSelectedNodes();
   let selectedData = selectedNodes.map((node: { data: any; }) => node.data);
   this.selectedJson = selectedData[0];
   if(note === 'edit') {
     this.formEdit.patchValue({
       editMovieType: this.selectedJson.name,
       editRemark: this.selectedJson.remark
     });
     $("#edit_movie_type").modal("show");
   } else if (note === 'delete') {
     $("#delele").modal("show");
   }
   return selectedData;
 }

 onBtnExport() {
   this.gridApi.exportDataAsCsv();
 }


 addMovieType() {
   $("#add_movie_type").modal("show");
 }

 save() {
   this.submitted = true;
   if(this.f.movieType.errors) {
     this.inputMovieType.nativeElement.focus();
   } else {
     const data = this.form.getRawValue();
     const api = '/api/sub-movie-type/v0/create';
     const jsonData = {
       name: data.movieType,
       remark: data.remark
     };
     this.hTTPService.Post(api, jsonData).then(response => {
       console.log(response);

       if(response.result.responseCode === HTTPResponseCode.Success) {
         this.inquiry();
         this.toastr.info(this.translate.instant('movieType.message.added'), this.translate.instant('common.label.success'),{
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

 update() {
   this.editSubmitted = true;
   if(this.fEdit.editMovieType.errors) {
     this.inputEditMovieType.nativeElement.focus();
   } else if(!this.selectedJson.id) {
     this.showErrMsg('unSelectRow');
   } else {
     const data = this.formEdit.getRawValue();
     const api = '/api/sub-movie-type/v0/update';
     const jsonData = {
       id: this.selectedJson.id,
       name: data.editMovieType,
       remark: data.editRemark
     };
     this.hTTPService.Post(api, jsonData).then(response => {
       if(response.result.responseCode === HTTPResponseCode.Success) {
         this.inquiry();
         this.disabled = true;
         $("#edit_movie_type").modal("hide");
         this.toastr.info(this.translate.instant('movieType.message.udpated'), this.translate.instant('common.label.success'),{
           timeOut: 5000,
         });
         this.formEdit = this.formBuilder.group({
           editMovieType: '',
           editRemark: ''
         });

       } else {
         this.showErrMsg(response.result.responseMessage);
       }
     });
   }
 }

 delete() {
   if (this.selectedJson.id) {
     const api = '/api/sub-movie-type/v0/delete';
     const jsonData = {
       id: this.selectedJson.id
     };
     this.hTTPService.Post(api, jsonData).then(response => {
       if(response.result.responseCode === HTTPResponseCode.Success) {
         this.inquiry();
         this.disabled = true;
         $("#delele").modal("hide");
         this.toastr.info(this.translate.instant('movieType.message.deleted'), this.translate.instant('common.label.success'),{
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

 // Get Employee  Api Call
 inquiry() {
   const api = '/api/sub-movie-type/v0/read';
   this.hTTPService.Get(api).then(response => {
     if(response.result.responseCode !== HTTPResponseCode.Success) {
        this.showErrMsg(response.result.responseMessage);
     } else {
       this.lstMovies = response.body;
       this.rowData =this.lstMovies;
     }
   });
 }

 ngOnDestroy(): void {
 }

 searchChange(event:any): void {
   if (event) {
    const search = this.lstMovies.filter( data => data.name.toLowerCase().includes(event.target.value));
    this.rowData = search;
   }
 }

 showErrMsg(msgKey: string, value?: any){
   let message = '';
   switch(msgKey) {
     case 'Invalid_Name':
       message = this.translate.instant('movieType.message.movieTypeRequired');
       break;
     case 'Invalid_SubVd_Id':
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

 get f(): { [key: string]: AbstractControl } {
   return this.form.controls;
 }

 get fEdit(): { [key: string]: AbstractControl } {
   return this.formEdit.controls;
 }


}
