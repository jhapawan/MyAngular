import { TestBed, inject } from '@angular/core/testing';

import { DataCommunicateService } from './data-communicate.service';

describe('DataCommunicateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCommunicateService]
    });
  });

  it('should be created', inject([DataCommunicateService], (service: DataCommunicateService) => {
    expect(service).toBeTruthy();
  }));
});
