import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMonthsDatepickerDemoComponent } from './two-months-datepicker-demo.component';

describe('TwoMonthsDatepickerDemoComponent', () => {
  let component: TwoMonthsDatepickerDemoComponent;
  let fixture: ComponentFixture<TwoMonthsDatepickerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoMonthsDatepickerDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMonthsDatepickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
