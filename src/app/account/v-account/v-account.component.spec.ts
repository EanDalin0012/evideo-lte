import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VAccountComponent } from './v-account.component';

describe('VAccountComponent', () => {
  let component: VAccountComponent;
  let fixture: ComponentFixture<VAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
