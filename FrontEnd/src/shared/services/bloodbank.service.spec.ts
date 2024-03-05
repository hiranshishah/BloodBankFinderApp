import { TestBed } from '@angular/core/testing';

import { BloodbankService } from './bloodbank.service';

describe('BloodbankService', () => {
  let service: BloodbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
