import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusYNComponent } from './status-yn.component';

describe('StatusYNComponent', () => {
  let component: StatusYNComponent;
  let fixture: ComponentFixture<StatusYNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusYNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusYNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
