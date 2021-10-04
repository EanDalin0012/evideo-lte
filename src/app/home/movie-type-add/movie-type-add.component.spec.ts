import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTypeAddComponent } from './movie-type-add.component';

describe('MovieTypeAddComponent', () => {
  let component: MovieTypeAddComponent;
  let fixture: ComponentFixture<MovieTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
