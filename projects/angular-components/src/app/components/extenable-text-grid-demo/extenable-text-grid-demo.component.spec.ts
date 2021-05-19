import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtenableTextGridDemoComponent } from './extenable-text-grid-demo.component';

describe('ExtenableTextGridDemoComponent', () => {
  let component: ExtenableTextGridDemoComponent;
  let fixture: ComponentFixture<ExtenableTextGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtenableTextGridDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtenableTextGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
