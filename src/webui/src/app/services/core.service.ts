import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {
  private readonly RUN_PROFILE_URL = '/api/profile';
  private readonly JIRA_URL = '/api/jira/${sprint}';
  private readonly JIRA_BY_ID_URL = '/api/jira/id/${id}';
  private readonly GIT_URL = '/api/git/${repoName}';
  private readonly ALL_GIT_PULL_URL = '/api/git';
  private readonly ALL_GIT_REPO = '/api/git/repos';

  constructor(private http: Http) {
  }

  checkoutProfile(): Observable<string> {
    return this.http.get(this.RUN_PROFILE_URL).map((s: Response) => s.text());
  }

  fetchJira(sprint: string): Observable<any> {
    return this.http.get(this.buildUrl(this.JIRA_URL, {sprint: sprint})).map((s: Response) => s.json());
  }

  getJiraIssue(issueId: string): Observable<any> {
    return this.http.get(this.buildUrl(this.JIRA_BY_ID_URL, {id: issueId})).map((s: Response) => s.json());
  }

  fetchGitPull(repoName: string): Observable<any> {
    return this.http.get(this.buildUrl(this.GIT_URL, {repoName: repoName})).map((s: Response) => s.json());
  }

  fetchAllGitPull(): Observable<any> {
    return this.http.get(this.ALL_GIT_PULL_URL).map((s: Response) => s.json());
  }

  fetchAllGitRepos(): Observable<any> {
    return this.http.get(this.ALL_GIT_REPO).map((s: Response) => s.json());
  }

  private buildUrl(url: string, params: any): string {
    const complied = _.template(url);
    return complied(params);
  }
}
