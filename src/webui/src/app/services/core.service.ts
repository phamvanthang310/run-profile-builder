import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import {UtilsService} from "./utils.service";

@Injectable()
export class CoreService {
  private readonly RUN_PROFILE_URL = '/api/profile';
  private readonly JIRA_URL = '/api/jira/${sprint}';
  private readonly JIRA_BY_ID_URL = '/api/jira/id/${id}';
  private readonly GIT_URL = '/api/git/${repoName}';
  private readonly ALL_GIT_PULL_URL = '/api/git';
  private readonly ALL_GIT_REPO = '/api/git/repos';

  constructor(private http: HttpClient, private utils: UtilsService) {
  }

  checkoutProfile(): Observable<string> {
    return this.http.get(this.RUN_PROFILE_URL, {responseType: 'text'});
  }

  fetchJira(sprint: string): Observable<any> {
    return this.http.get(this.buildUrl(this.JIRA_URL, {sprint}), {responseType: 'json'});
  }

  getJiraIssue(id: string): Observable<any> {
    return this.http.get(this.buildUrl(this.JIRA_BY_ID_URL, {id}), {responseType: 'json'});
  }

  fetchGitPull(repoName: string): Observable<any> {
    return this.http.get(this.buildUrl(this.GIT_URL, {repoName}), {responseType: 'json'});
  }

  fetchAllGitPull(): Observable<any> {
    return this.http.get(this.ALL_GIT_PULL_URL, {responseType: 'json'});
  }

  fetchAllGitRepos(): Observable<any> {
    return this.http.get(this.ALL_GIT_REPO, {responseType: 'json'});
  }

  private buildUrl(url: string, params: any): string {
    if (this.utils.isPlatformBrowser()) {
      const complied = _.template(url);
      return complied(params);
    }
    return '';
  }
}
