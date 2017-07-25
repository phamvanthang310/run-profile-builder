import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {CoreService} from '../services/core.service';
import {MdDialog} from '@angular/material';
import {ReleaseDialogComponent} from '../release-dialog/release-dialog.component';

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
  repos = [
    {
      name: 'mas-audit-queue-ui',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-link-ui',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-resolution-ui',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-batch-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-queue-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-export-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-header-sources-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mas-audit-resolution-ws',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'lnhc-client-id-enumeration',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mock-auth-server',
      releaseTagPrefix: 'jenkins'
    }, {
      name: 'mock-roxie-server',
      releaseTagPrefix: 'jenkins'
    }
  ];

  constructor(private title: Title, private coreSerivce: CoreService, public sanitizer: DomSanitizer,
              public dialog: MdDialog) {
    this.baserUrl = '/cgi-bin/checkprofile.py';
    this.sprint = 'Dolphin 2017.S7.2';
    this.isLoading = false;
  }

  ngOnInit() {
    this.title.setTitle('Generate Release');
    this.checkoutProfile();
    this.fetchJiraStory();
  }

  checkoutProfile() {
    this.runProfiles = null;
    this.isLoading = true;
    this.coreSerivce.checkoutProfile(this.baserUrl).subscribe(s => {
      this.runProfiles = s.split(/\r\n|\r|\n/g).join('</br>');
    }, error => {
      console.log(error);
    }, () => {
      this.isLoading = false;
    });
  }

  fetchJiraStory() {
    this.coreSerivce.fetchJira('/rest/api/2/search', this.sprint).subscribe(s => {
      console.log(s);
      this.stories = s.issues.map(issue => {
        issue.href = `https://jira.rsi.lexisnexis.com/browse/${issue.key}`;
        return issue;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReleaseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
