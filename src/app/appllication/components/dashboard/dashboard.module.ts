import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {GraphComponent} from "./graph/graph.component";
import {OverViewComponent} from "./over-view/over-view.component";
import {ngxChartsPolyfills} from "@swimlane/ngx-charts/lib/polyfills";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    DashboardComponent,
    GraphComponent,
    OverViewComponent

  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgxChartsModule

  ]
})
export class DashboardModule {
}
