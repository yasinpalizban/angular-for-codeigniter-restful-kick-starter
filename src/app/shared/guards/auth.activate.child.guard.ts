import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticateCheckerService} from "../../authenticate/services/authenticate.checker.service";
import {IAuth} from "../../authenticate/interfaces/authenticate.interface";
import {IPermissionGuard} from "../interfaces/auth.gaurd.interface";
import has = Reflect.has;

@Injectable({
  providedIn: 'root'
})
export class AuthActivateChildGuard implements CanActivate {

  constructor(private authService: AuthenticateCheckerService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user: IAuth = this.authService.authValue;

    let isAllowed: boolean = false;
    const permissions = user.permissions!;
    let permissionId: number = 0;

    for (const permission of permissions) {
      for (let i = 0; i < route.data.permissionName.length; i++)
        if (route.data.permissionName[i].toLowerCase() === permission.name) {
          permissionId = permission.id;
          break;
        }
    }

    if (permissionId > 0) {

      if (user.permissionGroup) {
        user.permissionGroup.forEach(groupPermission => {

          if (groupPermission.permissionId === permissionId) {
            groupPermission.actions.split("-")
              .forEach(value => {
                if (value === route.data.permission) {
                  isAllowed = true;
                }
              });


          }
        });
      }


      if (user.permissionUser) {
        user.permissionUser.forEach(userPermission => {


          if (userPermission.permissionsId === permissionId) {

            userPermission.actions.split("-")
              .forEach(value => {
                if (value === route.data.permission)
                  isAllowed = true;
              });
          }


        });
      }


    }


    if (route.data.roles && permissionId == 0) {

      route.data.roles.forEach((role: string) => {
        if (user.role?.name === role)
          isAllowed = true;
      });

    }

    if (!route.data.roles && permissionId == 0) {
      isAllowed = true;
    }


    if (!isAllowed) {
      this.router.navigate(['./403']);
    }

    return true;
  }
}


