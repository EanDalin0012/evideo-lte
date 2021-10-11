import { Component, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-arg-btn',
  templateUrl: './arg-btn.component.html',
  styleUrls: ['./arg-btn.component.css']
})
export class ArgBtnComponent implements OnInit, AgRendererComponent, ICellRendererAngularComp {

  params: any;
  constructor() { }

  ngOnInit(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }

}
