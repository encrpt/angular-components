import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleMonthsDatepickerHeaderComponent } from './multiple-months-datepicker-header.component';
import { MatDateFormats } from '@angular/material/core';

describe('MultiplMonthsDatepickerHeaderComponent', () => {
  let component: MultipleMonthsDatepickerHeaderComponent<MatDateFormats>;
  let fixture: ComponentFixture<
    MultipleMonthsDatepickerHeaderComponent<MatDateFormats>
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleMonthsDatepickerHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(
    //   MultipleMonthsDatepickerHeaderComponent
    // );
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
