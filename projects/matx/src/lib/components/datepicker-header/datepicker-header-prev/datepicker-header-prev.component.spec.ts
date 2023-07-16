import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerHeaderPrevComponent } from './datepicker-header-prev.component';

describe('DatepickerHeaderPrevComponent', () => {
  let component: DatepickerHeaderPrevComponent;
  let fixture: ComponentFixture<DatepickerHeaderPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerHeaderPrevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerHeaderPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
