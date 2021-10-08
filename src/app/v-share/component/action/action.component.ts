import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit, AgRendererComponent {
  params: any;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  ngOnInit(): void {
  }

}
