import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../v-share/service/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  public companySettings: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private uploadService: FileUploadService
  ) {
    this.companySettings as FormGroup;
  }

  ngOnInit() {
    this.companySettings = this.formBuilder.group({
      companyName: ["Delta Technoligies", [Validators.required]],
      contactPerson: ["Mclaren", [Validators.required]],
      address: ["Penning street", [Validators.required]],
      country: ["USA", [Validators.required]],
      city: ["Nyanose", [Validators.required]],
      state: ["Alabama", [Validators.required]],
      postalCode: ["845321", [Validators.required]],
      email: ["mclaren@deltatechnoligies.com", [Validators.required]],
      phoneNumber: ["071-654124", [Validators.required]],
      mobileNumber: ["8547522541", [Validators.required]],
      fax: ["012-456213", [Validators.required]],
      website: ["www.deltatechnoligies.com", [Validators.required]],
      lightLogo: [""],
    });
  }

  submitCompany() {
    if (this.companySettings.valid) {
      this.toastr.success("Company Settings is added", "Success");
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }


}
