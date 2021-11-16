import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtenableFormGridDemoComponent } from './extenable-form-grid-demo.component';

describe('ExtenableFormGridDemoComponent', () => {
  let component: ExtenableFormGridDemoComponent;
  let fixture: ComponentFixture<ExtenableFormGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtenableFormGridDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtenableFormGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
