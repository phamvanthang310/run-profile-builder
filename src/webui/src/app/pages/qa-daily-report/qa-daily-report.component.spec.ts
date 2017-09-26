import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QaDailyReportComponent} from './qa-daily-report.component';

describe('QaDailyReportComponent', () => {
  let component: QaDailyReportComponent;
  let fixture: ComponentFixture<QaDailyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QaDailyReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
