import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticateCheckerService} from '../../authenticate/services/authenticate.checker.service';
import {IAuth} from "../../authenticate/interfaces/authenticate.interface";


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authCheckerService: AuthenticateCheckerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user: IAuth = this.authCheckerService.authValue;

    const isLoggedViaJwt = user && user.jwt?.token;
    const isExpire: boolean = user && user.jwt?.expire! > Math.floor( new Date().getTime() / 1000);

    if (isLoggedViaJwt && isExpire) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + user.jwt?.token)});

    }
    // if (!request.headers.has('Content-Type')) {}

    const contentType = 'application/json';


    if (!(request.body instanceof FormData)) {

      // contentType = 'multipart/form-data;';
      // contentType = 'application/x-www-form-urlencoded';
      request = request.clone({headers: request.headers.set('Content-Type', contentType)});

    }


    // request = request.clone({setHeaders: {'Cache-Control': 'no-cache', Pragma: 'no-cache'}});
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    // request = request.clone({headers: request.headers.set('X-CSRF-TOKEN', localStorage.getItem('csrf') ?? 'not-set')});
    request = request.clone({headers: request.headers.set('Accept-Language', localStorage.getItem('lang') ?? 'en')});
    request = request.clone({withCredentials: true});
    return next.handle(request);

  }
}
