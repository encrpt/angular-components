import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMonthsDatepickerComponent } from './two-months-datepicker.component';

describe('TwoMonthsDatepickerComponent', () => {
  let component: TwoMonthsDatepickerComponent;
  let fixture: ComponentFixture<TwoMonthsDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoMonthsDatepickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMonthsDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
