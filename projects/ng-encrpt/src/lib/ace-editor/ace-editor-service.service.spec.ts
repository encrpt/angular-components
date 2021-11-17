import { TestBed } from '@angular/core/testing';

import { AceEditorServiceService } from './ace-editor-service.service';

describe('AceEditorServiceService', () => {
  let service: AceEditorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AceEditorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
