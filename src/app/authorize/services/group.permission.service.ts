import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../shared/services/alert.service';
import {ErrorService} from '../../shared/services/error.service';

import {environment} from '../../../environments/environment';


import {Router} from '@angular/router';
import {IQuery} from '../../shared/interfaces/query.interface';

import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../../shared/services/api.service';
import {IApiCommonFunction} from "../../shared/interfaces/api.common.function.service.interface";
import {IGroupPermission} from "../interfaces/group.permission.interface";
import {GroupPermission} from "../models/group.permission.model";


@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService extends  ApiService<IGroupPermission> implements IApiCommonFunction{

  constructor(protected httpClient: HttpClient,
              protected alertService: AlertService,
              protected  errorService: ErrorService,
              protected  translate: TranslateService,
              private router: Router
  ) {
    super(httpClient,
      alertService,
      errorService,
      environment.baseUrl + 'groupPermission',
      translate);
  }


  query(argument?: number | string | object): void {

    this.subscription.push(super.get(argument).subscribe((setting) => {
      this.dataSubject.next(setting);
    }));
  }


  save(permission: GroupPermission): void  {
    this.subscription.push(this.post(permission).subscribe(() => {
      this.alertService.clear();
      this.alertService.success(this.messageCreate, this.alertService.alertOption);
      setTimeout(() => {
        this.router.navigate(['./admin/group-permission/list']);
      }, 2000);
    }));
  }


  update(permission: GroupPermission): void  {

    let params: IQuery;
    this.getQueryArgumentObservable().subscribe((qParam: IQuery) => {
      params = qParam;
    });

    this.subscription.push(this.put(permission).subscribe(() => {
      this.alertService.clear();
      this.alertService.success(this.messageUpdate, this.alertService.alertOption);
      setTimeout(() => {
        this.router.navigate(['./admin/group-permission/list'], {
          queryParams: params
        });
      }, 2000);
    }));


  }


  remove(id: number): void  {

    this.subscription.push(this.delete(id).subscribe());


  }
}
