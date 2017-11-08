import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {CoreService} from '../../services/core.service';
import {ConfigService} from '../../services/config.service';
import _ from 'lodash';
import {ReleaseBuilderService} from "../../services/release-builder.service";
import {UtilsService} from "../../services/utils.service";
import {ReleaseDialogComponent} from "../../release-dialog/release-dialog.component";
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  readonly TITLE = 'Generate Release Email';
  readonly TABLE_OF_CONTENT = [
    {
      name: 'Run-profiles',
      link: '/home#run-profile'
    }, {
      name: 'Jira Issues',
      link: '/home#jira'
    }, {
      name: 'Repo Changes',
      link: '/home#repo'
    }, {
      name: 'Is Database Changes?',
      link: '/home#db-change'
    }, {
      name: 'Is Config Changes?',
      link: '/home#config-change'
    }
  ];
  baserUrl: string;
  sprint: string;
  runProfiles: string;
  isDbChange: boolean;
  isConfigChange: boolean;
  issues: Array<any>;
  repos: Array<any>;
  issueId: string;

  constructor(private title: Title, private coreSerivce: CoreService, public sanitizer: DomSanitizer,
              public utils: UtilsService, private config: ConfigService, public builder: ReleaseBuilderService) {
    this.baserUrl = 'ci01.dolphin.lexisnexisrisk.com/cgi-bin/checkprofile.py';
    this.isDbChange = false;
    this.isConfigChange = false;
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
    this.sprint = this.config.getSprint();
    this.checkoutProfile();
    this.fetchJiraStory();
    this.fetchAllGitRepos();
  }

  checkoutProfile() {
    this.runProfiles = null;
    this.coreSerivce.checkoutProfile().pipe(first()).subscribe(s => {
      this.runProfiles = s.split(/\r\n|\r|\n/g).join('</br>');
    }, error => {
      console.log(error);
    });
  }

  fetchJiraStory() {
    this.issues = null;
    this.coreSerivce.fetchJira(this.sprint).pipe(first()).subscribe(s => {
      this.issues = s;
    });
  }

  fetchAllGitRepos() {
    // Ignore all config repos
    this.coreSerivce.fetchAllGitRepos().pipe(first())
      .subscribe(s => this.repos = s.filter(repo => !_.endsWith(repo.name, 'config')));
  }

  getJiraIssue(event) {
    event.preventDefault();

    // Find first existed issue
    const issue = this.issues.filter(value => value.key === this.issueId.toUpperCase()).pop();

    // Request to get new
    if (_.isNil(issue)) {
      this.coreSerivce.getJiraIssue(this.issueId.toUpperCase()).pipe(first()).subscribe(issues => {
        if (!_.isEmpty(issues)) {
          const newIssue = issues[0];
          this.issues.unshift(newIssue);
          this.issueId = '';

          this.highLightIssue(newIssue);
        }
      });
    } else {
      this.highLightIssue(issue);
    }
  }

  openDialog() {
    const generatedContent = this.builder.build(this.sprint, this.runProfiles, this.issues, this.repos,
      this.isDbChange, this.isConfigChange);
    this.utils.openDialog({content: generatedContent, title: 'Profile Release'}, ReleaseDialogComponent);
  }

  private highLightIssue(issue) {
    issue.style = 'high-light'; // populate high-light class style
  }
}
