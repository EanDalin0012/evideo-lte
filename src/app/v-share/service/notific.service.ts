import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomNotificationComponent } from '../component/custom-notification/custom-notification.component';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificService {

  @ViewChild("container", { read: ViewContainerRef })
  public container!: ViewContainerRef;

  private horizontal = "right";
  private vertical = "top";

  constructor(
    private dataService: DataService
  ) { }

  public show(content: string) {
    this.dataService.sendMessageNotification(content);
    // this.notificationService.show({
    //   content: CustomNotificationComponent,
    //   appendTo: this.container, //CustomNotificationComponent,
    //   cssClass: "button-notification",
    //   animation: { type: "slide", duration: 400 },
    //   position: { horizontal: "right", vertical: "top" },
    //   type: { style: "success", icon: true },
    //   closable: true,
    // });
  }

  public showTopRight(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "slide", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: "right", vertical: "top" },
    //   closable,
    // });
  }

  public showTopCenter(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "slide", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: "center", vertical: "top" },
    //   closable
    // });
  }

  public showTopLeft(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "slide", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: "left", vertical: "top" },
    //   closable
    // });
  }

  public showBottomRight(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "fade", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: 'right', vertical: 'bottom' },
    //   closable
    // });
  }

  public showBottomCenter(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "fade", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: 'center', vertical: 'bottom' },
    //   closable
    // });
  }

  public showBottomLeft(content: string, style?: 'none' | 'success' | 'warning' | 'error' | 'info', closable?: boolean): void {
    // this.notificationService.show({
    //   content: content,
    //   animation: { type: "fade", duration: 800 },
    //   type: { style: style, icon: true },
    //   position: { horizontal: 'left', vertical: 'bottom' },
    //   closable
    // });
  }

}
