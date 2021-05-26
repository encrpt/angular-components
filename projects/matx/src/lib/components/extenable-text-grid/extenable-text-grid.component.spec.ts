import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtenableTextGridComponent } from './extenable-text-grid.component';

describe('ExtenableTextGridComponent', () => {
  let component: ExtenableTextGridComponent;
  let fixture: ComponentFixture<ExtenableTextGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtenableTextGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtenableTextGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
