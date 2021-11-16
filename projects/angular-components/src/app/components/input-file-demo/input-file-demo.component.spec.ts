import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileDemoComponent } from './input-file-demo.component';

describe('InputFileDemoComponent', () => {
  let component: InputFileDemoComponent;
  let fixture: ComponentFixture<InputFileDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputFileDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
