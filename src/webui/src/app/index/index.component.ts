import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {CoreService} from '../services/core.service';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ReleaseDialogComponent} from '../release-dialog/release-dialog.component';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  readonly TITLE = 'Generate Release Email';
  baserUrl: string;
  sprint: string;
  runProfiles: string;
  isLoading: boolean;
  stories: Array<any>;
  repos: Array<any>;

  constructor(private title: Title, private coreSerivce: CoreService, public sanitizer: DomSanitizer,
              public dialog: MdDialog, private config: ConfigService) {
    this.baserUrl = '/cgi-bin/checkprofile.py';
    this.sprint = 'Dolphin 2017.S8.1';
    this.isLoading = false;
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
    this.checkoutProfile();
    this.fetchJiraStory();
    this.fetchAllGitRepos();
  }

  checkoutProfile() {
    this.runProfiles = null;
    this.isLoading = true;
    this.coreSerivce.checkoutProfile().subscribe(s => {
      this.runProfiles = s.split(/\r\n|\r|\n/g).join('</br>');
      console.log(this.runProfiles);
    }, error => {
      console.log(error);
    }, () => {
      this.isLoading = false;
    });
  }

  fetchJiraStory() {
    this.coreSerivce.fetchJira(this.sprint).subscribe(s => {
      this.stories = s.issues.map(issue => {
        issue.href = `https://jira.rsi.lexisnexis.com/browse/${issue.key}`;
        return issue;
      });
    });
  }

  fetchAllGitRepos() {
    this.coreSerivce.fetchAllGitRepos().subscribe(s => this.repos = s);
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
