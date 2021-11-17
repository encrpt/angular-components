import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonDemoComponent } from './input-button-demo.component';

describe('InputButtonDemoComponent', () => {
  let component: InputButtonDemoComponent;
  let fixture: ComponentFixture<InputButtonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputButtonDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
