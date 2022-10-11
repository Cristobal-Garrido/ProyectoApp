import { TestBed } from '@angular/core/testing';

import { ServiciobdService } from './serviciobd.service';

describe('ServiciobdService', () => {
  let service: ServiciobdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciobdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
