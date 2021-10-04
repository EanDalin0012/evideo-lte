import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTypeSettingComponent } from './movie-type-setting.component';

describe('MovieTypeSettingComponent', () => {
  let component: MovieTypeSettingComponent;
  let fixture: ComponentFixture<MovieTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTypeSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
