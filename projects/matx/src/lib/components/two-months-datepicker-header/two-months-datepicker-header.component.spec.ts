import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMonthsDatepickerHeaderComponent } from './two-months-datepicker-header.component';

describe('TwoMonthsDatepickerHeaderComponent', () => {
  let component: TwoMonthsDatepickerHeaderComponent;
  let fixture: ComponentFixture<TwoMonthsDatepickerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoMonthsDatepickerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMonthsDatepickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
