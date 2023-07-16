import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerHeaderNextComponent } from './datepicker-header-next.component';

describe('DatepickerHeaderNextComponent', () => {
  let component: DatepickerHeaderNextComponent;
  let fixture: ComponentFixture<DatepickerHeaderNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerHeaderNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerHeaderNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
