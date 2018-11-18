import { TestBed, inject } from '@angular/core/testing';

import { FcrService } from './fcr.service';

describe('FcrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcrService]
    });
  });

  it('should be created', inject([FcrService], (service: FcrService) => {
    expect(service).toBeTruthy();
  }));
});
