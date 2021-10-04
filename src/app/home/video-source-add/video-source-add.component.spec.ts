import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSourceAddComponent } from './video-source-add.component';

describe('VideoSourceAddComponent', () => {
  let component: VideoSourceAddComponent;
  let fixture: ComponentFixture<VideoSourceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSourceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
