import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSourcePlayComponent } from './video-source-play.component';

describe('VideoSourcePlayComponent', () => {
  let component: VideoSourcePlayComponent;
  let fixture: ComponentFixture<VideoSourcePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSourcePlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSourcePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
