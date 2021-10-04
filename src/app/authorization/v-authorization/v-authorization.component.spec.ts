import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VAuthorizationComponent } from './v-authorization.component';

describe('VAuthorizationComponent', () => {
  let component: VAuthorizationComponent;
  let fixture: ComponentFixture<VAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
