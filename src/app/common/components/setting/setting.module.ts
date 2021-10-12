import {NgModule} from '@angular/core';
import {SettingRoutingModule} from './setting-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {SettingComponent} from './setting.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';

@NgModule({
  declarations: [
    SettingComponent,
    EditComponent,
    AddComponent,
    ListComponent,
    DetailComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    SettingRoutingModule,

  ]
})
export class SettingModule {
}
