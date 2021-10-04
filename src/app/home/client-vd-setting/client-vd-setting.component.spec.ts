import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVdSettingComponent } from './client-vd-setting.component';

describe('ClientVdSettingComponent', () => {
  let component: ClientVdSettingComponent;
  let fixture: ComponentFixture<ClientVdSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVdSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVdSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
