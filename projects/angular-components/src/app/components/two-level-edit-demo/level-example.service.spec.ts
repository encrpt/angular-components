import { TestBed } from '@angular/core/testing';

import { LevelExampleService } from './level-example.service';

describe('LevelExampleService', () => {
  let service: LevelExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
