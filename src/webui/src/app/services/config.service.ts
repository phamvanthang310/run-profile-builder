import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import _ from 'lodash';

@Injectable()
export class ConfigService {
  private readonly SPRINT_KEY = 'sprint';
  private readonly DEFAULT_SPRINT = 'Dolphin 2017.S8.1';

  constructor(private localStorageService: LocalStorageService) {

  }

  getSprint() {
    const sprint = this.localStorageService.get(this.SPRINT_KEY);
    if (_.isEmpty(sprint)) {
      this.setSprint(this.DEFAULT_SPRINT);
      return this.getSprint();
    }
    return sprint;
  }

  setSprint(value) {
    return this.localStorageService.set(this.SPRINT_KEY, value);
  }
}
