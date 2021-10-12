import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,

} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticateCheckerService} from "../../authenticate/services/authenticate.checker.service";
import {IAuth} from "../../authenticate/interfaces/authenticate.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthActivateGuard implements CanActivate {

  constructor(private authService: AuthenticateCheckerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: IAuth = this.authService.authValue;
    if (this.authService.authValue == null) {

      this.router.navigate(['./home/sign-in']);
    }
    return this.authService.isLoggedIn();


  }

}


