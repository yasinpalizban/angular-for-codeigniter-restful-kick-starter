import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAreaComponent} from '../../../admin-area/admin-area.component';

import {ProfileComponent} from './profile.component';
import {AuthActivateGuard} from "../../../shared/guards/auth.activate.guard";
import {AuthActivateChildGuard} from "../../../shared/guards/auth.activate.child.guard";


const routes: Routes = [

  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      }


    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
