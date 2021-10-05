import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { EncryptionUtil } from 'src/app/v-share/util/encryption-util';
import { Utils } from '../../v-share/util/utils.static';
import { LOCAL_STORAGE } from '../../v-share/constants/common.const';
declare const $: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  // Utils.setSecureStorage(LOCAL_STORAGE.USER_INFO, result.userInfo);

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: any;
  public dtOptions: DataTables.Settings = {};

  lstHolidays: any[] = [];
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
    private router: Router
  ) {
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
  }

  // Get Employee  Api Call
  loadholidays() {
    this.lstHolidays = holidays;
    this.dtTrigger.next();
    this.rows = this.lstHolidays;
    this.srch = [...this.rows];
    // this.srvModuleService.get(this.url).subscribe((data) => {
    // });
  }

  newMovie() {
    this.router.navigate(['/home/vd-add']);
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
    console.log('value', value, JSON.stringify(value));
    const jsonString = JSON.stringify(value);
    const item = EncryptionUtil.encrypt(jsonString.toString()).toString();
    console.log('item', item);

    Utils.setSecureStorage(LOCAL_STORAGE.MOVEI_Edit, item);
    this.router.navigate(['/home/vd-edit']);

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

export const holidays = [
  {
    id: 1,
    title: "New Year",
    holidaydate: "01-01-2020",
    remark: "sun day",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 2,
    title: "Diwali",
    holidaydate: "28-02-2020",
    remark: "Thursday ",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 3,
    title: "Christmas",
    holidaydate: "28-02-2020",
    remark: "Friday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 4,
    title: "Ramzon",
    holidaydate: "17-02-2020",
    remark: "sun day",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 5,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 6,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 7,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 8,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 9,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 10,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
  {
    id: 11,
    title: "Bakrid",
    holidaydate: "15-09-2020",
    remark: "Saturday",
    movie: 'Khmer',
    movieType: 'Drama'
  },
];

