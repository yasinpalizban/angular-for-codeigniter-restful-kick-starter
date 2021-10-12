import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../shared/services/alert.service';
import {ErrorService} from '../../shared/services/error.service';

import {environment} from '../../../environments/environment';

import {Router} from '@angular/router';
import {IQuery} from '../../shared/interfaces/query.interface';
import {IUser} from '../interfaces/user.interface';
import {User} from '../models/user.model';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../../shared/services/api.service';
import {IApiCommonFunction} from "../../shared/interfaces/api.common.function.service.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<IUser> implements IApiCommonFunction {

  constructor(protected httpClient: HttpClient,
              protected alertService: AlertService,
              protected  errorService: ErrorService,
              protected  translate: TranslateService,
              private router: Router
  ) {
    super(httpClient,
      alertService,
      errorService,
      environment.baseUrl + 'user',
      translate);
  }
  query(argument?: number | string | object): void {
    this.subscription.push(super.get(argument).subscribe((user) => {
      this.dataSubject.next(user);
    }));
  }


  save(user: User): void {
    this.subscription.push(this.post(user).subscribe(() => {
      this.alertService.clear();
      this.alertService.success(this.messageCreate, this.alertService.alertOption);
      setTimeout(() => {
        this.router.navigate(['./admin/user/list']);
      }, 2000);
    }));
  }
  update(user: User): void {

    let params: IQuery;
    this.getQueryArgumentObservable().subscribe((qParam: IQuery) => {
      params = qParam;
    });
    this.subscription.push(this.put(user).subscribe(() => {
      this.alertService.clear();
      this.alertService.success(this.messageUpdate, this.alertService.alertOption);
      setTimeout(() => {
        this.router.navigate(['./admin/user/list'], {
          queryParams: params
        });
      }, 2000);
    }));

  }
  remove(id: number): void {

    this.subscription.push(this.delete(id).subscribe());
  }
}
