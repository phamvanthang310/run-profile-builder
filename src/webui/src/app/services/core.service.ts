import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {
  private readonly RUN_PROFILE_URL = '/api/profile';
  private readonly JIRA_URL = '/api/jira/${sprint}';
  private readonly JIRA_BY_ID_URL = '/api/jira/id/${id}';
  private readonly GIT_URL = '/api/git/${repoName}';
  private readonly ALL_GIT_PULL_URL = '/api/git';
  private readonly ALL_GIT_REPO = '/api/git/repos';

  constructor(private http: HttpClient) {
  }

  checkoutProfile(): Observable<string> {
    return this.http.get(this.RUN_PROFILE_URL, {responseType: 'text'});
  }

  fetchJira(sprint: string): Observable<any> {
    return this.http.get(this.JIRA_URL, {responseType: 'json', params: {sprint}});
  }

  getJiraIssue(id: string): Observable<any> {
    return this.http.get(this.JIRA_BY_ID_URL, {responseType: 'json', params: {id}});
  }

  fetchGitPull(repoName: string): Observable<any> {
    return this.http.get(this.GIT_URL, {responseType: 'json', params: {repoName}});
  }

  fetchAllGitPull(): Observable<any> {
    return this.http.get(this.ALL_GIT_PULL_URL, {responseType: 'json'});
  }

  fetchAllGitRepos(): Observable<any> {
    return this.http.get(this.ALL_GIT_REPO, {responseType: 'json'});
  }
}
