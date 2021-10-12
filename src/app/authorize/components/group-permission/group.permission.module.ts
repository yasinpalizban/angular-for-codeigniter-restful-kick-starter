import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';

import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';

import {GroupPermissionRoutingModule} from "./group.permission-routing.module";
import {GroupPermissionComponent} from "./group.permission.component";

@NgModule({
  declarations: [

    GroupPermissionComponent,

    EditComponent,

    AddComponent,

    ListComponent,

    SearchComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    GroupPermissionRoutingModule,

  ]
})
export class GroupPermissionModule {
}
