import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {

  message: any;
  constructor(
    private zone: NgZone,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessagePermissionModule.subscribe(message => {
      // this.message = message;
      switch(message) {
        case '/api/video/v0/read':
          this.message = 'video view'
          break;
      }
    });
  }

  toLogin() {
    this.zone.run(() =>  this.router.navigate(['/login'], { replaceUrl: true }));
    // window.rediect
  }
}
