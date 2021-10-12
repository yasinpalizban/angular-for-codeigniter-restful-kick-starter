import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorInterceptType} from '../enums/error.intercept.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//    return next.handle(request);

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.type && err.error.type === ErrorInterceptType.Login) {
          this.router.navigate(['./home/sign-out']);
        } else if (err.error.type && err.error.type === ErrorInterceptType.Permission) {
          this.router.navigate(['./403']);
        } else if (err.error.type && err.error.type === ErrorInterceptType.Jwt) {
          this.router.navigate(['./home/sign-out']);
        } else if (err.error.type && err.error.type === ErrorInterceptType.Csrf) {
          //  this.router.navigate(['./sign-out']);
          //  this.router.navigate(['./403']);
        }
       // else if (err.error.type && err.error.type === ErrorInterceptType.Activation) {
          //   this.router.navigate(['./home/sign-out']);
        //}


        return throwError(err);
      }), map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);


        }
        return event;
      }));
  }

}

