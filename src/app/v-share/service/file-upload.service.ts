import { LOCAL_STORAGE } from './../constants/common.const';
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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    console.log(authorization);

    const access_token = authorization.access_token;

    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer ' + access_token);

    const req = new HttpRequest('POST', 'http://localhost:8080/api/files/video/upload', formData, {
      reportProgress: true,
      headers: headers,
      responseType: 'json'
    });

    return this.http.request(req);


  }
}
