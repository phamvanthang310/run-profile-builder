import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  remove(key: string): boolean {
    localStorage.removeItem(key);
    return this.get(key).isEmpty();
  }

}
