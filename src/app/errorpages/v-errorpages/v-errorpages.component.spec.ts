import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VErrorpagesComponent } from './v-errorpages.component';

describe('VErrorpagesComponent', () => {
  let component: VErrorpagesComponent;
  let fixture: ComponentFixture<VErrorpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VErrorpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VErrorpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
