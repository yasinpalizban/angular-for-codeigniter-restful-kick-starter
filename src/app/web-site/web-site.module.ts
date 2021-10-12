import {NgModule} from '@angular/core';
import {WebSiteRoutingModule} from './web-site-routing.module';

import {WebSiteComponent} from './web-site.component';
import {SharedModule} from '../shared/shared.module';
import {AuthenticateModule} from '../authenticate/components/authenticate.module';
import {HeaderComponent} from './layout/components/header/header.component';
import {FooterComponent} from './layout/components/footer/footer.component';
import {HomeModule} from '../home/components/home.module';

@NgModule({
  declarations: [
    WebSiteComponent,
    HeaderComponent,
    FooterComponent


  ],
  imports: [

    SharedModule,
    AuthenticateModule,
    HomeModule,
    WebSiteRoutingModule,

  ]
})
export class WebSiteModule {
}
