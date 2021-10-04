import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTypeEditComponent } from './movie-type-edit.component';

describe('MovieTypeEditComponent', () => {
  let component: MovieTypeEditComponent;
  let fixture: ComponentFixture<MovieTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
