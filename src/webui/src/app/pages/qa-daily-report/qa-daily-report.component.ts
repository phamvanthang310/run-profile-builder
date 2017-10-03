import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CoreService} from "../../services/core.service";
import {ConfigService} from "../../services/config.service";
import {QaDailyReportBuilderService} from "../../services/qa-daily-report-builder.service";
import {ReleaseDialogComponent} from "../../release-dialog/release-dialog.component";
import {UtilsService} from "../../services/utils.service";
import {LocalStorageService} from "../../services/local-storage.service";
import _ from 'lodash';
import {DragulaService} from "ng2-dragula";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-qa-daily-report',
  templateUrl: './qa-daily-report.component.html',
  styleUrls: ['./qa-daily-report.component.scss']
})
export class QaDailyReportComponent implements OnInit, OnDestroy {
  public readonly TITLE = 'QA Daily Report';
  public static readonly DONE_ISSUES_KEY = 'Done-Issues';
  public static readonly IN_PROGRESS_ISSUES_KEY = 'In-progress-Issues';

  public issues: Array<any>;
  public doneIssues: Array<any>;
  public inProgressIssues: Array<any>;
  public sprint: string;

  private dragulaObser;

  constructor(public title: Title, public coreService: CoreService, public configService: ConfigService,
              public builder: QaDailyReportBuilderService, public utils: UtilsService, public localStorage: LocalStorageService,
              public dragulaService: DragulaService) {
    title.setTitle(this.TITLE);
    this.sprint = this.configService.getSprint();
    this.doneIssues = [];
    this.inProgressIssues = [];
  }

  ngOnInit() {
    this.fetchIssues();
    this.dragulaObser = this.dragulaService.drop.subscribe(value => {
      console.log(value);
      this.persistIssues();
    });
  }

  ngOnDestroy(): void {
    this.dragulaObser.unsubscribe();
  }

  public refresh() {
    this.issues = null;
    this.doneIssues = null;
    this.inProgressIssues = null;
    this.persistIssues();

    this.fetchIssues();
  }

  public openDialog() {
    const generatedContent = this.builder.build(this.doneIssues, this.inProgressIssues);
    this.utils.openDialog({
      content: generatedContent,
      title: `[Dolphin] Daily status ${this.utils.getInstantDate()}`
    }, ReleaseDialogComponent);
  }

  public clearIssues(issues: Array<any>) {
    while (issues.length > 0) {
      this.issues.push(issues.pop());
    }

    this.issues.sort((a, b) => {
      const aKey = a.key.toUpperCase();
      const bKey = b.key.toUpperCase();
      // Sort DESC order
      if (aKey < bKey) return 1;
      if (aKey > bKey) return -1;
      return 0;
    });
  }

  public pushCustomIssue(form: NgForm) {
    this.issues.push({
      fields: {
        issuetype: {
          name: 'Story'
        },
        summary: form.value.summary
      }
    });
  }

  private fetchIssues() {
    this.coreService.fetchJira(this.sprint).subscribe(issues => {
      this.issues = issues.filter(this.isNotSubTaskAndBug);
      this.getPersistedIssues();
    });
  }

  private isNotSubTaskAndBug(issue): boolean {
    return !issue.fields.issuetype.subtask && (issue.fields.issuetype.name === 'Story');
  }

  private persistIssues(): void {
    this.localStorage.set(QaDailyReportComponent.DONE_ISSUES_KEY, this.doneIssues);
    this.localStorage.set(QaDailyReportComponent.IN_PROGRESS_ISSUES_KEY, this.inProgressIssues);
  }

  private getPersistedIssues() {
    const doneIssues = this.localStorage.get(QaDailyReportComponent.DONE_ISSUES_KEY);
    this.doneIssues = _.isEmpty(doneIssues) ? [] : doneIssues;

    const inProgressIssues = this.localStorage.get(QaDailyReportComponent.IN_PROGRESS_ISSUES_KEY);
    this.inProgressIssues = _.isEmpty(inProgressIssues) ? [] : inProgressIssues;

    // Remove existed issue from done/in-progress issues.
    _.pullAllBy(this.issues, this.doneIssues, 'key');
    _.pullAllBy(this.issues, this.inProgressIssues, 'key');
  }
}
