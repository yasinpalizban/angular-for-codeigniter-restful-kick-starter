import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAreaComponent} from './admin-area.component';
import {AuthActivateGuard} from '../shared/guards/auth.activate.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminAreaComponent,
    canActivate: [AuthActivateGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAreaRoutingModule {
}
