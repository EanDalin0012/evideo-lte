import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-v-errorpages',
  templateUrl: './v-errorpages.component.html',
  styleUrls: ['./v-errorpages.component.css']
})
export class VErrorpagesComponent implements OnInit {

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit(): void {
    console.log();
  }

  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
