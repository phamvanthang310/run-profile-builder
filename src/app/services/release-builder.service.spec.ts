import {inject, TestBed} from '@angular/core/testing';

import {ReleaseBuilderService} from './release-builder.service';

describe('ReleaseBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleaseBuilderService]
    });
  });

  it('should be created', inject([ReleaseBuilderService], (service: ReleaseBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
