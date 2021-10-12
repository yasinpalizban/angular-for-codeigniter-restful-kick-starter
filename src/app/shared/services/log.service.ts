import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
  }

  public show(data: any): void {
    if (environment.logger) {
      console.log(data);
    }
  }
}
