import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AdminAreaComponent} from './admin-area.component';
import {AdminAreaRoutingModule} from './admin-area-routing.module';
import {SettingModule} from '../common/components/setting/setting.module';
import {ProfileModule} from '../common/components/profile/profile.module';
import {GroupModule} from '../authorize/components/group/group.module';
import {UserModule} from '../common/components/users/user.module';;
import {HeaderComponent} from './layout/components/header/header.component';
import {FooterComponent} from './layout/components/footer/footer.component';
import {DashboardModule} from "../appllication/components/dashboard/dashboard.module";
import {PermissionModule} from "../authorize/components/permission/permission.module";
import {GroupPermissionModule} from "../authorize/components/group-permission/group.permission.module";
import {UserPermissionModule} from "../authorize/components/user-permission/user.permission.module";

@NgModule({
  declarations: [
    AdminAreaComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    SharedModule,
    AdminAreaRoutingModule,
    DashboardModule,
    ProfileModule,
    SettingModule,
    GroupModule,
    UserModule,
    PermissionModule,
    GroupPermissionModule,
    UserPermissionModule

  ]
})
export class AdminAreaModule {
}
