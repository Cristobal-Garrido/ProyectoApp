import { TestBed } from '@angular/core/testing';

import { FireBaseBdService } from './fire-base-bd.service';

describe('FireBaseBdService', () => {
  let service: FireBaseBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBaseBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
