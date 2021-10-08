import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef, Module } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { HTTPService } from '../../v-share/service/http.service';
import { TranslateService } from '@ngx-translate/core';
import { MyImgComponent } from '../my-img/my-img.component';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  lstMovies: any[] = [];
  pagination = true;
  paginationPageSize = 10;
  gridApi:any;
  gridColumnApi :any;
  public modules: any[] = AllCommunityModules;
  frameworkComponents: any;
  defaultColDef: any;
  columnDefs: ColDef[] = [];
  rowData: any;

constructor(
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private hTTPService: HTTPService,
    private translate: TranslateService,
   private http: HttpClient) {

}
  ngOnInit(): void {
    this.columnDefs = [
      { field: 'athlete' },
      { field: 'year' },
      {
        field: 'gold',
        cellRenderer: 'medalCellRenderer',
      },
      {
        field: 'silver',
        cellRenderer: 'medalCellRenderer',
      },
      {
        field: 'bronze',
        cellRenderer: 'medalCellRenderer',
      },
      {
        field: 'total',
        minWidth: 175,
        cellRenderer: 'totalValueRenderer',
      },
    ];
    this.frameworkComponents = {
      medalCellRenderer: MyImgComponent,
      totalValueRenderer: MyImgComponent,
    };
    this.defaultColDef = {
      editable: false,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
    this.inquiry();

  }

  inquiry() {

    const api = '/api/movie-type/v0/read';
    this.hTTPService.Get(api).then(response => {
      console.log(response);

      if (response) {
        this.lstMovies = response;
        this.rowData = this.lstMovies;
        // this.setColumns(this.columnDefs);
      }
    });
  }

  setColumns(columns: any[]) {
    this.columnDefs = [];
    columns.forEach((column: any) => {
      console.log('columns', column);

      let definition: ColDef = { headerName: column, field: column, width: 120 };
      if (column === 'image') {
        console.log('ddd');

        definition.cellRendererFramework = MyImgComponent;
        definition.cellRendererParams = {
          inRouterLink: column,
        };
      }
      // else if (column.endsWith('Date')) {
      //   definition.valueFormatter = (data) => this.dateFormatter.transform(data.value, 'shortDate');
      // } else if (column === 'price') {
      //   definition.valueFormatter = (data) => this.numberFormatter.transform(data.value, '1.2-2');
      //   definition.type = 'numericColumn';
      // }
      this.columnDefs.push(definition);
    });
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }

}
