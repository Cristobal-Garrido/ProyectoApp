import { TestBed } from '@angular/core/testing';

import { ApiAlumnosService } from './api-alumnos.service';

describe('ApiAlumnosService', () => {
  let service: ApiAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
