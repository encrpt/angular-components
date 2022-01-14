import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSearchDemoComponent } from './autocomplete-search-demo.component';

describe('AutocompleteSearchDemoComponent', () => {
  let component: AutocompleteSearchDemoComponent;
  let fixture: ComponentFixture<AutocompleteSearchDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteSearchDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteSearchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
