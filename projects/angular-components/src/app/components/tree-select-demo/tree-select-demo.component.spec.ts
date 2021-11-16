import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectDemoComponent } from './tree-select-demo.component';

describe('TreeSelectDemoComponent', () => {
  let component: TreeSelectDemoComponent;
  let fixture: ComponentFixture<TreeSelectDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeSelectDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
