import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InfoComponent } from './projectinfo/info.component';
import { InfoService } from './projectinfo/info.service';
import { MetricsMasterService } from './projectinfo/metrics-master.service';
import { routing } from './app.routing';
import { NavComponent } from './shared/nav.component';
import { Statuscomponent } from './weeklyreport/status.component';
import { RiskComponent } from './riskstatus/risk.component';
import { RiskService } from './riskstatus/risk.service';


@NgModule({
  imports: [BrowserModule, HttpModule, routing, FormsModule],
  declarations: [AppComponent, InfoComponent, NavComponent, Statuscomponent, RiskComponent],
  providers: [InfoService, MetricsMasterService, RiskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
