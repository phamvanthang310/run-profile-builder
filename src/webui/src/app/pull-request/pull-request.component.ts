import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from '../services/core.service';
import {Title} from '@angular/platform-browser';
import {ConfigService} from '../services/config.service';
import {Subscription} from 'rxjs/Subscription';
import _ from 'lodash';

@Component({
  selector: 'app-pull-request',
  templateUrl: './pull-request.component.html',
  styleUrls: ['./pull-request.component.scss']
})
export class PullRequestComponent implements OnInit, OnDestroy {
  readonly TITLE = 'Pull requests';
  readonly ALL_REPO = 'all';
  readonly repos: Array<any>;
  pullsGroupByRepo: Array<any>;
  subscription: Subscription;

  constructor(private title: Title, private coreSerivce: CoreService, private config: ConfigService) {
    this.repos = [];
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
    this.fetchPull();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPull(repoName = this.ALL_REPO): void {
    let observable = null;
    if (_.eq(this.ALL_REPO, repoName)) {
      observable = this.coreSerivce.fetchAllGitPull();
    } else {
      observable = this.coreSerivce.fetchGitPull(repoName);
    }
    this.subscription = observable.subscribe(pulls => this.processPulls(pulls));
  }

  changeRepo(event) {
    this.pullsGroupByRepo = null;
    this.fetchPull(event.value);
  }

  private processPulls(pulls: Array<any>): void {
    this.pullsGroupByRepo = [];
    const groupedPulls = _.groupBy(pulls, _.iteratee('head.repo.name'));
    _.forEach(groupedPulls, (value, key) => {
      this.pullsGroupByRepo.push({
        name: key,
        pulls: value
      });
    });
  }
}
