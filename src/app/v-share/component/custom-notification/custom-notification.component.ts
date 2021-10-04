import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.css']
})
export class CustomNotificationComponent implements OnInit {

  message: string = '';
  constructor(private modalDataService: DataService) {
    this.modalDataService.currentMessageNotification.subscribe(message => this.message = message);
  }

  ngOnInit(): void {
    this.modalDataService.currentMessageNotification.subscribe(message => this.message = message)
  }

}
