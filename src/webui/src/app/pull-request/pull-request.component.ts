import {Component, OnInit} from '@angular/core';
import {CoreService} from '../services/core.service';
import {Title} from '@angular/platform-browser';
import {ConfigService} from '../services/config.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-pull-request',
  templateUrl: './pull-request.component.html',
  styleUrls: ['./pull-request.component.scss']
})
export class PullRequestComponent implements OnInit {
  readonly TITLE = 'Pull requests control';
  readonly repos: Array<any>;
  pullsObser: Observable<Array<any>>;

  constructor(private title: Title, private coreSerivce: CoreService, private config: ConfigService) {
    this.repos = this.config.getRepos();
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
    this.fetchPullRequest('master-audit-resolution-ui');
  }

  fetchPullRequest(repoName: string) {
    this.pullsObser = this.coreSerivce.fetchGitPRs(repoName);
  }
}
