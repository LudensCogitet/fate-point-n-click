import { TestBed, inject } from '@angular/core/testing';

import { FateServiceService } from './fate-service.service';

describe('FateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FateServiceService]
    });
  });

  it('should be created', inject([FateServiceService], (service: FateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
