import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {

  constructor(private http: Http) {
  }

  checkoutProfile(url: string): Observable<string> {
    return this.http.get(url).map((s: Response) => s.text());
  }

  fetchJira(url: string, sprint: string): Observable<any> {
    return this.http.get(this.buildUrl(url, sprint), this.buildJiraHeader()).map((s: Response) => {
      return s.json();
    });
  }

  fetchGitPRs(url: string, repo: string) {
    return this.http.get(`/api/v3/repos/kms-lnhc/${repo}/pulls`, this.buildGitHeader()).map((s: Response) => {
      return s.json();
    });
  }

  private buildUrl(url: string, sprint: string): string {
    return `${url}?jql=project = MAS AND issuetype in (Bug, Story, "Bug Sub-Task") AND Sprint = "${sprint}"`;
  }

  private buildJiraHeader(): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic UGhhbVRoMDFAcmlzazpIQHJkd29yaw==');
    return new RequestOptions({headers: headers});
  }

  private buildGitHeader(): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'token d48ee5883255d4bcd6668424237c53cd672708dc');
    return new RequestOptions({headers: headers});
  }
}
