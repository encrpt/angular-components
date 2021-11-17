import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceEditorDemoComponent } from './ace-editor-demo.component';

describe('AceEditorDemoComponent', () => {
  let component: AceEditorDemoComponent;
  let fixture: ComponentFixture<AceEditorDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AceEditorDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
