import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WebSiteComponent} from '../../web-site/web-site.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {TestComponent} from './test/test.component';


const routes: Routes = [

  {
    path: '',
    component: WebSiteComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact-us', component: ContactComponent},
      {path: 'test', component: TestComponent},

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
