import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTestingComponent } from './loading-testing.component';

describe('LoadingTestingComponent', () => {
  let component: LoadingTestingComponent;
  let fixture: ComponentFixture<LoadingTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
