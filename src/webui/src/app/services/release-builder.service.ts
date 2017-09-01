import {Injectable} from '@angular/core';
import _ from 'lodash';

@Injectable()
export class ReleaseBuilderService {

  constructor() {
  }

  buildRelease(sprint: string, runProfile: string, jiraStories: Array<any>, repoChanges: Array<any>,
               isDbChange = false, isConfigChange = false): string {
    const template = `
      <p>Hi Team,</p>
      <p>We have next release for sprint: ${sprint}</p>
      <p><b><u>Runprofile:</u></b></p>
      <p>${this.buildRunProfiles(repoChanges, runProfile)}</p>
      <p><b><u>For onshore code checkout only:</u></b></p>
      <ul>
        ${this.buildCheckOutTags(repoChanges, runProfile)}
      </ul>
      <p><b><u>Changes in this release:</u></b></p>
      <ul>
        ${this.buildChanges(jiraStories)}
      </ul>
      <p>
        <b><u>Database change:</u></b>
        ${isDbChange ? '<span style="color: red"> YES - (Just select initDatabase option when deploying the run-profile)</span>' : 'NO'}
      </p>
      <p>
        <b><u>Config change:</u></b>
        ${isConfigChange ? '<span style="color: red"> YES </span>' : 'NO'}
      </p>
    `;
    return template;
  }

  private buildRunProfiles(repos: Array<any>, runProfile: string): string {
    if (!_.isNull(runProfile) && !_.isEmpty(repos)) {
      const repoNames = repos.filter(repo => repo.checked).map(repo => repo.name);
      return runProfile.split('</br>').map(profile => {
        return `<span style="${_.includes(repoNames, profile.split(' ')[0]) ? 'color: red; font-weight: bold' : ''}">${profile}</span>`;
      }).join('</br>');
    }
    return '';
  }

  private buildCheckOutTags(repos: Array<any>, runProfile: string): string {
    if (!_.isEmpty(repos)) {
      return repos.filter(repo => repo.checked).map(repo => {
        return `<li>${repo.name}: tag:${repo.jenkinBuildName}-${this.extractBuildNumber(repo.name, runProfile)}</li>`;
      }).join('');
    }
    return '';
  }

  private buildChanges(jiraStories: Array<any>): string {
    if (!_.isEmpty(jiraStories)) {
      return jiraStories.filter(story => story.checked).map(story => {
        return `<li><a href="${story.href}">${story.key}:</a> ${story.fields.summary}</li>`;
      }).join('');
    }
    return '';
  }

  private extractBuildNumber(repoName: string, runProfile: string): string {
    const builds = runProfile.split('</br>');
    return builds.filter(build => build.startsWith(repoName)).map(build => {
      return build.replace(repoName, '').trim();
    }).pop();
  }
}
