import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {
  readonly RUN_PROFILE_URL = '/api/profile';
  readonly JIRA_URL = '/api/jira/${sprint}';
  readonly GIT_URL = '/api/git/${repoName}';
  readonly ALL_GIT_PULL_URL = '/api/git';

  constructor(private http: Http) {
  }

  checkoutProfile(): Observable<string> {
    return this.http.get(this.RUN_PROFILE_URL).map((s: Response) => s.text());
  }

  fetchJira(sprint: string): Observable<any> {
    return this.http.get(this.buildUrl(this.JIRA_URL, {sprint: sprint})).map((s: Response) => s.json());
  }

  fetchGitPull(repoName: string) {
    return this.http.get(this.buildUrl(this.GIT_URL, {repoName: repoName})).map((s: Response) => s.json());
  }

  fetchAllGitPull() {
    return this.http.get(this.ALL_GIT_PULL_URL).map((s: Response) => s.json());
  }

  private buildUrl(url: string, params: any): string {
    const complied = _.template(url);
    console.log(complied(params));
    return complied(params);
  }
}
