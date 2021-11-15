import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSourcePermissionModule = new BehaviorSubject('default message');
  currentMessagePermissionModule = this.messageSourcePermissionModule.asObservable();

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSourceBodyEvent = new BehaviorSubject('default message event');
  currentMessageBody = this.messageSourceBodyEvent.asObservable();

  private messageSourceNotification = new BehaviorSubject('default message');
  currentMessageNotification = this.messageSourceNotification.asObservable();

  private visitSource =  new BehaviorSubject<any>('');
  visitData = this.visitSource.asObservable();

  private visitSourceParamRoutorChange =  new BehaviorSubject<any>('');
  visitSourceParamRoutorChangeData = this.visitSourceParamRoutorChange.asObservable();

  private viewProductDetail =  new BehaviorSubject<any>('');
  viewProductDetailData = this.viewProductDetail.asObservable();

  private viewNewAccountClose =  new BehaviorSubject<any>('');
  viewNewAccountCloseData = this.viewNewAccountClose.asObservable();

  private chageProfile =  new BehaviorSubject<any>('');
  chageProfileData = this.chageProfile.asObservable();

  sendMessagePermissionModule(message: string) {
    this.messageSourcePermissionModule.next(message);
  }


  sendMessageNotification(message: string) {
    this.messageSourceNotification.next(message);
  }

  sendMessageBodyEvent(message: string) {
    this.messageSourceBodyEvent.next(message);
  }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }

  visitMessage(message: any) {
    this.visitSource.next(message);
  }

  visitParamRouterChange(message: any) {
    this.visitSourceParamRoutorChange.next(message);
  }

  viewProductDetailMessage(message: any) {
    this.viewProductDetail.next(message);
  }

  viewNewAccountCloseMessage(message: any) {
    this.viewNewAccountClose.next(message);
  }

  chageProfileDataMessage(message: any) {
    this.chageProfile.next(message);
  }

  unsubscribeNewAccountClose() {
    this.viewNewAccountClose.complete();
  }

  unsubscribeBodyEvent() {
    this.messageSourceBodyEvent.complete();
  }
}

