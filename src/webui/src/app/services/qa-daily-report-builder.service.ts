import {Injectable} from '@angular/core';

@Injectable()
export class QaDailyReportBuilderService {

  constructor() {
  }

  public build(issues: Array<any>, doneIssues: Array<any>, inprogressIssues: Array<any>): string {
    return `
      <div style="margin: 5px 0">Below is Dolphin Report for today.</div>
      <span style="color: rgb(31,73,125); font-size: 15px; font-style: italic">
        <strong>Work Done/Completed:</strong>
      </span>
      <ul>${this.buildIssues(doneIssues)}</ul>
      <span style="color: rgb(31,73,125); font-size: 15px; font-style: italic">
        <strong>In Progress & Planning:</strong>
      </span>
      <ul>${this.buildIssues(inprogressIssues)}</ul>
    `;
  }

  private buildIssues(issues: Array<any>): string {
    return issues.map(issue => `<li><a href="${issue.href}">${issue.key}:</a> ${issue.fields.summary}</li>`).join('');
  }

}
