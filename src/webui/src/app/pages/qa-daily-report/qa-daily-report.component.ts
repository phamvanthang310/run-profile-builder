import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CoreService} from "../../services/core.service";
import {ConfigService} from "../../services/config.service";
import {QaDailyReportBuilderService} from "../../services/qa-daily-report-builder.service";
import {ReleaseDialogComponent} from "../../release-dialog/release-dialog.component";
import {UtilsService} from "../../services/utils.service";

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

  constructor(public title: Title, public coreService: CoreService, public configService: ConfigService,
              public builder: QaDailyReportBuilderService, public utils: UtilsService) {
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
    const generatedContent = this.builder.build(this.issues, this.doneIssues, this.inProgressIssues);
    this.utils.openDialog({
      content: generatedContent,
      title: `[Dolphin] Daily status ${this.utils.getInstanceDate()}`
    }, ReleaseDialogComponent);
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
