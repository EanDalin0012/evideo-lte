import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgBtnComponent } from './arg-btn.component';

describe('ArgBtnComponent', () => {
  let component: ArgBtnComponent;
  let fixture: ComponentFixture<ArgBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
