import {inject, TestBed} from '@angular/core/testing';

import {QaDailyReportBuilderService} from './qa-daily-report-builder.service';

describe('QaDailyReportBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QaDailyReportBuilderService]
    });
  });

  it('should be created', inject([QaDailyReportBuilderService], (service: QaDailyReportBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
