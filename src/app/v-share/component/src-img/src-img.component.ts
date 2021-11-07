import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-src-img',
  templateUrl: './src-img.component.html',
  styleUrls: ['./src-img.component.css']
})
export class SrcImgComponent implements OnInit, AgRendererComponent {

  baseUrl: string = '';
  params: any;
  constructor() {
    this.baseUrl = environment.bizServer.server;
  }

  ngOnInit(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;

  }
}
