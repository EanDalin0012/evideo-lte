import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-img',
  templateUrl: './my-img.component.html',
  styleUrls: ['./my-img.component.css']
})
export class MyImgComponent implements OnInit, AgRendererComponent {

  params: any;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log('this.params', this.params.data.athlete);

  }

  ngOnInit(): void {
  }

}
