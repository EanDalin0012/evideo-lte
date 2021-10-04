import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockLoginComponent } from './lock-login.component';

describe('LockLoginComponent', () => {
  let component: LockLoginComponent;
  let fixture: ComponentFixture<LockLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
