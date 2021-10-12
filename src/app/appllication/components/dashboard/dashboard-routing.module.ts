import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAreaComponent} from "../../../admin-area/admin-area.component";
import {RoleType} from "../../../shared/enums/role.enum";
import {PermissionType} from "../../../shared/enums/permission.enum";
import {OverViewComponent} from "./over-view/over-view.component";
import {GraphComponent} from "./graph/graph.component";
import {DashboardComponent} from "./dashboard.component";
import {AuthActivateChildGuard} from "../../../shared/guards/auth.activate.child.guard";
import {AuthActivateGuard} from "../../../shared/guards/auth.activate.guard";


const routes: Routes = [

  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthActivateChildGuard],
        data: {
          roles: [RoleType.Admin],
          permission: PermissionType.Get,
          permissionName: ["overView", "graph"]

        },

        children: [
          {
            path: 'graph', component: GraphComponent
          },
          {
            path: 'over-view', component: OverViewComponent
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
export class DashboardRoutingModule {
}
