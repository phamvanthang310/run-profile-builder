import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  readonly repos = [
    {
      name: 'master-audit-queue-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-link-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-resolution-ui',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-batch-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-queue-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-export-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-header-sources-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'master-audit-resolution-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'lnhc-client-id-enumeration-ws',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'mock-auth-server',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }, {
      name: 'mock-roxie-server',
      releaseTagPrefix: 'jenkins',
      pulls: []
    }
  ];

  constructor() {
  }

  getRepos(): Array<any> {
    return this.repos;
  }

}
