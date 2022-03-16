import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpytyDatepickerHeaderComponent } from './empyty-datepicker-header.component';

describe('EmpytyDatepickerHeaderComponent', () => {
  let component: EmpytyDatepickerHeaderComponent;
  let fixture: ComponentFixture<EmpytyDatepickerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpytyDatepickerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpytyDatepickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
