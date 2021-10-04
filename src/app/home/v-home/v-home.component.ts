import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-v-home',
  templateUrl: './v-home.component.html',
  styleUrls: ['./v-home.component.css']
})
export class VHomeComponent implements OnInit {

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
