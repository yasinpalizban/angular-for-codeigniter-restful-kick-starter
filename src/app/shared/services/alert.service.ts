import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Alert} from '../models/alert.model';
import {filter} from 'rxjs/operators';
import {AlertType} from '../enums/alert.enum';
import {IAlert} from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  alertOptions: IAlert;

  constructor() {
    this.alertOptions = {
      autoClose: true,
      keepAfterRouteChange: false,
      body: []
    };

  }

  public get alertOption(): IAlert {

    return this.alertOptions;
  }

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any): void {
    this.clear();
    this.alert(new Alert({...options, type: AlertType.Success, message}));
  }

  error(message: string, options?: any): void {
    this.clear();
    this.alert(new Alert({...options, type: AlertType.Error, message}));
  }

  info(message: string, options?: any): void {
    this.clear();
    this.alert(new Alert({...options, type: AlertType.Info, message}));
  }

  warn(message: string, options?: any): void {
    this.clear();
    this.alert(new Alert({...options, type: AlertType.Warning, message}));
  }

  // main alert method
  alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId): void {
    this.subject.next(new Alert({id}));

  }
}
