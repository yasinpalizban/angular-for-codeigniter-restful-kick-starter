import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';

import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';

import {PermissionRoutingModule} from "./permission-routing.module";
import {PermissionComponent} from "./permission.component";

@NgModule({
  declarations: [

    PermissionComponent,

    EditComponent,

    AddComponent,

    ListComponent,

    SearchComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    PermissionRoutingModule,

  ]
})
export class PermissionModule {
}
