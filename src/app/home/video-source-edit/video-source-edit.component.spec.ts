import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSourceEditComponent } from './video-source-edit.component';

describe('VideoSourceEditComponent', () => {
  let component: VideoSourceEditComponent;
  let fixture: ComponentFixture<VideoSourceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSourceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
