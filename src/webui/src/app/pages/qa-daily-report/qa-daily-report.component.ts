import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CoreService} from "../../services/core.service";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-qa-daily-report',
  templateUrl: './qa-daily-report.component.html',
  styleUrls: ['./qa-daily-report.component.scss']
})
export class QaDailyReportComponent implements OnInit {
  public readonly TITLE = 'QA Daily Report';
  public issues: Array<any>;
  public doneIssues: Array<any>;
  public inProgressIssues: Array<any>;
  public sprint: string;

  constructor(private title: Title, private coreService: CoreService, private configService: ConfigService) {
    title.setTitle(this.TITLE);
    this.sprint = this.configService.getSprint();
    this.doneIssues = [];
    this.inProgressIssues = [];
  }

  ngOnInit() {
    this.fetchIssues();
  }

  public refresh() {
    this.issues = null;
    this.fetchIssues();
  }

  public openDialog() {

  }

  private fetchIssues() {
    this.coreService.fetchJira(this.sprint).subscribe(issues => {
      this.issues = issues.filter(this.isNotSubTask);
    });
  }

  private isNotSubTask(issue): boolean {
    return !issue.fields.issuetype.subtask;
  }

}
