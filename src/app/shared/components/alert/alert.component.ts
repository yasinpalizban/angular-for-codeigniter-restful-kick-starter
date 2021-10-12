import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Alert} from '../../models/alert.model';
import {AlertService} from '../../services/alert.service';
import {AlertType} from '../../enums/alert.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;

  constructor(private alertService: AlertService) {
    this.alertSubscription = new Subscription();
  }

  ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {

        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

  }


  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: Alert): void {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) {
      return;
    }

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => {
        if (x === alert) {
          x.fade = true;
        }
      });

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert): string | void {
    if (!alert) {
      return;
    }

    const classes = ['alert', 'alert-dismissible', 'show', ' with-close', 'sufee-alert'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    };

    classes.push(alertTypeClass[alert.type!]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  clear(): void {
    this.alertService.clear(this.id);
  }
}
