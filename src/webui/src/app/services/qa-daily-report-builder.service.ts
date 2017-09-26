import {Injectable} from '@angular/core';
import _ from 'lodash';

@Injectable()
export class QaDailyReportBuilderService {

  constructor() {
  }

  public build(issues: Array<any>) {
    const issuePartition = _.partition(issues, issue => issue.checked);
  }

}
