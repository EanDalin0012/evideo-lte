import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VLayoutComponent } from './v-layout.component';

describe('VLayoutComponent', () => {
  let component: VLayoutComponent;
  let fixture: ComponentFixture<VLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
