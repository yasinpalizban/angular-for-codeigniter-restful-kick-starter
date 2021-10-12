import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertService: AlertService) {
  }

  public handleError(errorResponse: HttpErrorResponse) {
    //  console.log(errorResponse);
    //  console.log(errorResponse.statusText);
    // console.log(errorResponse.error);
    // let errorMessage = 'An unknown error occurred!';
    // if (!errorResponse.error || !errorResponse.error.error) {
    //   return throwError(errorMessage);
    // }
    this.alertService.clear();
    this.alertService.alertOption.body.splice(0, this.alertService.alertOption.body.length);

    if (typeof errorResponse.error.error === 'string') {

      this.alertService.alertOption.body.push(errorResponse.error.error);

    } else {
      for (const key in errorResponse.error.error) {
        this.alertService.alertOption.body.push(errorResponse.error.error[key]);
      }
    }

    this.alertService.clear();
    this.alertService.error(` ${errorResponse.statusText}
    `, this.alertService.alertOption);

    return throwError(errorResponse);
  }

}
