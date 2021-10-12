import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, CanLoad, Route, UrlSegment,

} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticateCheckerService} from "../../authenticate/services/authenticate.checker.service";
import {IAuth} from "../../authenticate/interfaces/authenticate.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthLoadGuard implements CanLoad {

  constructor(private authService: AuthenticateCheckerService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: IAuth = this.authService.authValue;


    return true;
  }

}


