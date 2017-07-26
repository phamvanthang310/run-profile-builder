import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {CoreService} from '../services/core.service';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ReleaseDialogComponent} from '../release-dialog/release-dialog.component';
import {ReleaseBuilderService} from '../services/release-builder.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  baserUrl: string;
  sprint: string;
  runProfiles: string;
  isLoading: boolean;
  stories: Array<any>;
  report: string;
  repos = [
    {
      name: 'master-audit-queue-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-link-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-resolution-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-batch-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-queue-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-export-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-header-sources-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-resolution-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'lnhc-client-id-enumeration-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'mock-auth-server',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'mock-roxie-server',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }
  ];

  constructor(private title: Title, private coreSerivce: CoreService, public sanitizer: DomSanitizer,
              public dialog: MdDialog, private releaseService: ReleaseBuilderService) {
    this.baserUrl = '/cgi-bin/checkprofile.py';
    this.sprint = 'Dolphin 2017.S7.2';
    this.isLoading = false;
  }

  ngOnInit() {
    this.title.setTitle('Generate Release');
    this.checkoutProfile();
    this.fetchJiraStory();
    // this.fetchGitPrs();
  }

  checkoutProfile() {
    this.runProfiles = null;
    this.isLoading = true;
    this.coreSerivce.checkoutProfile(this.baserUrl).subscribe(s => {
      this.runProfiles = s.split(/\r\n|\r|\n/g).join('</br>');
      console.log(this.runProfiles);
    }, error => {
      console.log(error);
    }, () => {
      this.isLoading = false;
    });
  }

  fetchJiraStory() {
    this.coreSerivce.fetchJira('/rest/api/2/search', this.sprint).subscribe(s => {
      this.stories = s.issues.map(issue => {
        issue.href = `https://jira.rsi.lexisnexis.com/browse/${issue.key}`;
        return issue;
      });
    });
  }

  openDialog() {
    const config: MdDialogConfig = new MdDialogConfig();
    config.width = '1000px';
    const dialogRef = this.dialog.open(ReleaseDialogComponent, config);
    dialogRef.componentInstance.data = {
      sprint: this.sprint,
      runProfiles: this.runProfiles,
      stories: this.stories,
      repos: this.repos
    };
  }
}
