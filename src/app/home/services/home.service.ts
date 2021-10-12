import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {AlertService} from '../../shared/services/alert.service';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../shared/services/error.service';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private alertOptions = {
    autoClose: false,
    keepAfterRouteChange: false,
    body: []

  };

  constructor(private httpClient: HttpClient,
              private router: Router,
              private alertService: AlertService,
              private  cookieService: CookieService,
              private errorService: ErrorService,
              private translate: TranslateService
  ) {

  }





  clearAlert(): void {
    this.alertService.clear();
  }
}
