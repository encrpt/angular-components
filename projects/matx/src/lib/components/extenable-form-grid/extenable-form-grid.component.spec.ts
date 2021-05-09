import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtenableFormGridComponent } from './extenable-form-grid.component';

describe('ExtenableFormGridComponent', () => {
  let component: ExtenableFormGridComponent;
  let fixture: ComponentFixture<ExtenableFormGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtenableFormGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtenableFormGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
