import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPreViewComponent } from './video-pre-view.component';

describe('VideoPreViewComponent', () => {
  let component: VideoPreViewComponent;
  let fixture: ComponentFixture<VideoPreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPreViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
