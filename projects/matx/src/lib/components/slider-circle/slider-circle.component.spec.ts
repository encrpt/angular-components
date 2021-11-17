import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCircleComponent } from './slider-circle.component';

describe('SliderCircleComponent', () => {
  let component: SliderCircleComponent;
  let fixture: ComponentFixture<SliderCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderCircleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
