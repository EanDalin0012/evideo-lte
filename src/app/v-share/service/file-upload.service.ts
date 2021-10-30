import { Title } from '@angular/platform-browser';
import { LOCAL_STORAGE, FileUploadModule } from './../constants/common.const';
import { Utils } from 'src/app/v-share/util/utils.static';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.bizServer.server;
  }

  upload(file: File, title: string, fileUpload: 'Profile' | 'LstVideoSource' | 'Image' | 'LstVideo'): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);

    formData.append('file', file);
    formData.append('title', title);
    formData.append('userId', userInfo.id);
    formData.append('fileUpload', fileUpload);

    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;
    const uri = this.baseUrl + "/api/files/video/upload";

    const headers= new HttpHeaders().set('Authorization', 'Bearer ' + access_token);

    const req = new HttpRequest('POST', uri, formData, {
      reportProgress: true,
      headers: headers,
      responseType: 'json'
    });

    return this.http.request(req);

  }
}
