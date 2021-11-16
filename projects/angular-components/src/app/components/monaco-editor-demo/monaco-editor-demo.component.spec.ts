import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoEditorDemoComponent } from './monaco-editor-demo.component';

describe('MonacoEditorDemoComponent', () => {
  let component: MonacoEditorDemoComponent;
  let fixture: ComponentFixture<MonacoEditorDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonacoEditorDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonacoEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
