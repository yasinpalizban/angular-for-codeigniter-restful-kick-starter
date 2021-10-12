import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {TestComponent} from './test/test.component';

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    ContactComponent,
    TestComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,

  ]
})
export class HomeModule {
}
