import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DataService } from '../../v-share/service/data.service';
declare const $: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: any;
  public dtOptions: DataTables.Settings = {};

  lstMovies: any[] = [];
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
  ) {
    this.dtElement as DataTableDirective;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
  }

  ngOnInit() {
    this.loadholidays();
  }

  // Get Employee  Api Call
  loadholidays() {
    this.lstMovies = movies;
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

export const movies = [
  {
    id: 1,
    name: "Khmer",
    remark: "Khmer",
  },
  {
    id: 2,
    name: "Thai",
    remark: "Thai",
  },
  {
    id: 3,
    name: "Chiness",
    remark: "Chiness",
  },
  {
    id: 4,
    name: "Korean",
    remark: "Korean",
  },
  {
    id: 5,
    name: "HoliFood",
    remark: "HoliFood",
  },
];
