import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  StatusCodes,
} from 'http-status-codes';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor() {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse
        && event.body.csrf
        && event.status === StatusCodes.OK) {
        localStorage.setItem('csrf', event.body.csrf);
      }
      return event;
    }));
  }

}

