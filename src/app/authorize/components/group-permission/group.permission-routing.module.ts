import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAreaComponent} from '../../../admin-area/admin-area.component';
import {RoleType} from '../../../shared/enums/role.enum';
import {PermissionType} from '../../../shared/enums/permission.enum';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {GroupPermissionComponent} from "./group.permission.component";
import {AuthActivateChildGuard} from "../../../shared/guards/auth.activate.child.guard";
import {AuthActivateGuard} from "../../../shared/guards/auth.activate.guard";


const routes: Routes = [

  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard],
    children: [
      {
        path: 'group-permission',
        component: GroupPermissionComponent,
        canActivate: [AuthActivateGuard],

        children: [
          {
            path: 'add',
            component: AddComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Post,
              permissionName: ["groupPermission"]

            },
          },
          {
            path: 'edit/:id',
            component: EditComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Put,
              permissionName: ["groupPermission"]

            },
          },
          {
            path: 'list',
            component: ListComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Get,
              permissionName: ["groupPermission"]

            },
          },
          {
            path: 'detail/:id',
            component: DetailComponent,
            canActivate: [AuthActivateChildGuard],
            data: {
              roles: [RoleType.Admin],
              permission: PermissionType.Get,
              permissionName: ["groupPermission"]

            },
          }
        ]
      },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPermissionRoutingModule {
}
