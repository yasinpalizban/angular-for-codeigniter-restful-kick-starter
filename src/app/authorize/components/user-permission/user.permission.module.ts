import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';

import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';

import {UserPermissionRoutingModule} from "./user.permission-routing.module";
import {UserPermissionComponent} from "./user.permission.component";

@NgModule({
  declarations: [

    UserPermissionComponent,

    EditComponent,

    AddComponent,

    ListComponent,

    SearchComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    UserPermissionRoutingModule,

  ]
})
export class UserPermissionModule {
}
