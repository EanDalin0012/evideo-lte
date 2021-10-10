import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-yn',
  templateUrl: './status-yn.component.html',
  styleUrls: ['./status-yn.component.css']
})
export class StatusYNComponent implements OnInit,AgRendererComponent {

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
}
