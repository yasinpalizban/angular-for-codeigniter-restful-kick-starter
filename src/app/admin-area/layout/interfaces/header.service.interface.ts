import {Observable} from "rxjs";
import {INotification} from "./notification.interface";

export interface HeaderServiceInterface {
  checkUrlParams(): void;

  checkNotification(): void;

  getNewNotification(): Observable<INotification>;

  getExplodeLink(): Observable<string[]>;

  getUrlPath(): Observable<string>;

  unsubscribe(): void;
}
