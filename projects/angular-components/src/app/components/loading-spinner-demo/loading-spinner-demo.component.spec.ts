import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerDemoComponent } from './loading-spinner-demo.component';

describe('LoadingSpinnerDemoComponent', () => {
  let component: LoadingSpinnerDemoComponent;
  let fixture: ComponentFixture<LoadingSpinnerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinnerDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
