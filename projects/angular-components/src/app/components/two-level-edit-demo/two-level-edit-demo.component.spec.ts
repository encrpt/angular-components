import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLevelEditDemoComponent } from './two-level-edit-demo.component';

describe('TwoLevelEditDemoComponent', () => {
  let component: TwoLevelEditDemoComponent;
  let fixture: ComponentFixture<TwoLevelEditDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLevelEditDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoLevelEditDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
