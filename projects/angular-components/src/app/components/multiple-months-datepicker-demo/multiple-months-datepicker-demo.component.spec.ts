import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleMonthsDatepickerDemoComponent } from './multiple-months-datepicker-demo.component';

describe('MultipleMonthsDatepickerDemoComponent', () => {
  let component: MultipleMonthsDatepickerDemoComponent;
  let fixture: ComponentFixture<MultipleMonthsDatepickerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleMonthsDatepickerDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleMonthsDatepickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
