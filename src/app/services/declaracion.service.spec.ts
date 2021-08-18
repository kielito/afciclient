import { TestBed } from '@angular/core/testing';

import { DeclaracionService } from './declaracion.service';

describe('DeclaracionService', () => {
  let service: DeclaracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclaracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
