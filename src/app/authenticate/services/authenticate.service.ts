import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IAuth} from '../interfaces/authenticate.interface';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AlertService} from '../../shared/services/alert.service';
import {environment} from '../../../environments/environment';
import {Auth} from '../models/authenticate.model';
import {ErrorService} from '../../shared/services/error.service';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../../shared/services/api.service';
import {AuthenticateServiceInterface} from "../interfaces/authenticate.service.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends ApiService<IAuth> implements AuthenticateServiceInterface {

  authChange: BehaviorSubject<IAuth>;

  private alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    body: []

  };
  private messageRegister!: string;
  private messageActivate!: string;
  private messageForgot!: string;
  private messageReset!: string;
  private messageSendSms!: string;
  private messageSendEmail!: string;

  constructor(protected httpClient: HttpClient,
              protected alertService: AlertService,
              protected  errorService: ErrorService,
              protected  translate: TranslateService,
              private router: Router,
  ) {
    super(httpClient,
      alertService,
      errorService,
      environment.baseUrl + 'auth',
      translate);

    this.subscription = [];
    this.translate.get(['auth.messageRegister']).subscribe(data => this.messageRegister = data['auth.messageRegister']);
    this.translate.get(['auth.messageActivate']).subscribe(data => this.messageActivate = data['auth.messageActivate']);
    this.translate.get(['auth.messageForgot']).subscribe(data => this.messageForgot = data['auth.messageForgot']);
    this.translate.get(['auth.messageReset']).subscribe(data => this.messageReset = data['auth.messageReset']);
    this.translate.get(['auth.messageSendSms']).subscribe(data => this.messageSendSms = data['auth.messageSendSms']);
    this.translate.get(['auth.messageSendEmail']).subscribe(data => this.messageSendEmail = data['auth.messageSendEmail']);
    this.authChange = new BehaviorSubject<IAuth>(JSON.parse(localStorage.getItem('user')!));

  }

  signInJwt(auth: Auth): void {

    this.pageUrl = environment.baseUrl + 'auth/signin-jwt';
    this.subscription.push(this.post(auth).pipe(tap((auth: IAuth) => {
      this.authChange.next(auth);
      localStorage.setItem('csrf', auth.csrf!);
      localStorage.setItem('user', JSON.stringify(auth));
    })).subscribe(() => {

      let address: string = window.location.origin;
      if (address.search('www') !== -1) {
        window.location.replace(environment.siteAddress.two + '/admin/dashboard/over-view');
      } else {
        window.location.replace(environment.siteAddress.one + '/admin/dashboard/over-view');
      }
    }));

  }


  signOut(): void {

    this.pageUrl = environment.baseUrl + 'auth/signout';
    this.subscription.push(this.get().subscribe(() => {

      this.authChange.next({});
      localStorage.removeItem('user');
      localStorage.removeItem('chatRoom');
      localStorage.removeItem('csrf');

    }));
    this.router.navigate(['./home/sign-in']);
  }


  activateAccountViaEmail(auth: Auth): void {


    this.pageUrl = environment.baseUrl + 'auth/activate-account-email';
    this.subscription.push(this.post(auth).subscribe(data => {
      this.alertService.clear();
      this.alertService.success(this.messageActivate, this.alertOptions);
      setTimeout(() => {
        this.router.navigate(['/home/sign-in']);
      }, 2000);
    }));

  }

  sendActivateCodeViaEmail(auth: Auth): void {

    this.pageUrl = environment.baseUrl + 'auth/send-activate-email';
    this.subscription.push(this.post(auth).subscribe(data => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageSendEmail, this.alertOptions);
    }));
  }

  forgot(auth: Auth): void {


    this.pageUrl = environment.baseUrl + 'auth/forgot';
    this.subscription.push(this.post(auth).subscribe(() => {
      this.alertService.clear();
      this.alertService.success(this.messageForgot, this.alertOptions);
    }));
  }

  signUp(auth: Auth): void {

    this.pageUrl = environment.baseUrl + 'auth/signup';
    this.subscription.push(this.post(auth).subscribe(() => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageRegister, this.alertOptions);
      setTimeout(() => {
        this.router.navigate(['/home/sign-in']);
      }, 2000);
    }));

  }

  resetPasswordViaEmail(auth: Auth): void {

    this.pageUrl = environment.baseUrl + 'auth/reset-password-email';
    this.subscription.push(this.post(auth).subscribe(() => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageReset, this.alertOptions);
      setTimeout(() => {
        this.router.navigate(['/home/sign-in']);
      }, 2000);
    }));
  }

  resetPasswordViaSms(auth: Auth): void {
    this.pageUrl = environment.baseUrl + 'auth/reset-password-sms';
    this.subscription.push(this.post(auth).subscribe(() => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageReset, this.alertOptions);
      setTimeout(() => {
        this.router.navigate(['/home/sign-in']);
      }, 2000);
    }));
  }

  public get authValue(): IAuth {
    return this.authChange.value;
  }


  activateAccountViaSms(auth: Auth): void {
    this.pageUrl = environment.baseUrl + 'auth/activate-account-sms';
    this.subscription.push(this.post(auth).subscribe(() => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageActivate, this.alertOptions);
      setTimeout(() => {
        this.router.navigate(['/home/sign-in']);
      }, 2000);
    }));

  }


  sendActivateCodeViaSms(auth: Auth): void {


    this.pageUrl = environment.baseUrl + 'auth/send-activate-sms';
    this.subscription.push(this.post(auth).subscribe(() => {
      // console.log(data);
      this.alertService.clear();
      this.alertService.success(this.messageSendSms, this.alertOptions);
    }));

  }

  signIn(auth: Auth): void {

    this.pageUrl = environment.baseUrl + 'auth/signin';
    this.subscription.push(this.post(auth).pipe(tap((auth: IAuth) => {
      this.authChange.next(auth);
      localStorage.setItem('csrf', auth.csrf!);
      localStorage.setItem('user', JSON.stringify(auth));
    })).subscribe(() => {

      let address: string = window.location.origin;
      if (address.search('www') !== -1) {
        window.location.replace(environment.siteAddress.two + '/admin/dashboard/over-view');
      } else {
        window.location.replace(environment.siteAddress.one + '/admin/dashboard/over-view');
      }
    }));

  }


}
