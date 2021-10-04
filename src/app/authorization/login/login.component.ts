import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { DataService } from '../../v-share/service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthentcatiionService } from '../../v-share/service/authentcatiion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  @ViewChild("userName") inputUserName: any;
  @ViewChild("password") inputPassword: any;
  isFirstLogin = false;

  public formLogin: any;
  constructor(
    private dataService: DataService,
    private authentcatiionService: AuthentcatiionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    ) {
      this.formLogin as FormGroup;
      this.inputUserName as ElementRef;
      this.inputPassword as ElementRef;

      this.formLogin = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.formLogin.patchValue({
      userName: 'admin@gmail.com',
      password: 'admin123'
    });
  }

  routors() {
    this.router.navigate(['/acc']);
  }

  isEmpty(value: string) {
    switch (value) {
      case 'u':
        this.formLogin.patchValue({
          userName: '',
        });
        break;
      case 'p':
        this.formLogin.patchValue({
          password: '',
        });
        break;
    }
  }

  onLogin() {
    this.submitted = true;
    if(this.f.userName.errors) {
      this.inputUserName.nativeElement.focus();
    } else if (this.f.password.errors) {
      this.inputPassword.nativeElement.focus();
    } else {
      const formData = this.formLogin.getRawValue();
      const logInfo = {
        user_name: formData.userName,
        password: formData.password
      };
      this.authentcatiionService.login(logInfo).then((result: any) => {
        if(result) {
          console.log(result);
          this.isFirstLogin = result.isFirstLogin;
          if(this.isFirstLogin == true) {
            this.zone.run(() =>  this.router.navigate(['/home'], { replaceUrl: true }));
          } else {
            this.zone.run(() =>  this.router.navigate(['/home'], { replaceUrl: true }));
          }
        }
      }).catch((err: any) => {
          console.log(err);
      });
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  changePassword(item: any) {
    // this.modalService.open(
    //   ChangePasswordComponent,
    //   {
    //     message: item,
    //     callback: _response => {

    //   }
    // });
  }
}
