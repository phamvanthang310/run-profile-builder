import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable()
export class LocalStorageService {

  constructor(private util: UtilsService) {
  }

  get(key: string): any {
    if (this.util.isPlatformBrowser()) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  set(key: string, data: any): void {
    if (this.util.isPlatformBrowser()) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  remove(key: string): boolean {
    if (this.util.isPlatformBrowser()) {
      localStorage.removeItem(key);
      return !!this.get(key);
    }
    return false;
  }
}
