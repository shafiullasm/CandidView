import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InfoComponent } from './projectinfo/info.component';
import { InfoService } from './projectinfo/info.service';
import { OverallStatusComponent } from './overall-status/overall-status.component';
import { SlaStatusService } from './overall-status/sla-status.service';
import { routing } from './app.routing';
import { NavComponent } from './shared/nav.component';
import { Statuscomponent } from './weeklyreport/status.component';
import { HighlightsComponent } from './Highlights-Status/highlights.component';
import { HighlightsService } from './Highlights-Status/highlights.service';
import { RiskComponent } from './riskstatus/risk.component';
import { RiskService } from './riskstatus/risk.service';
import { LegendComponent } from './legend/legend.component';


@NgModule({
  imports: [BrowserModule, HttpModule, routing, FormsModule],
  declarations: [AppComponent, InfoComponent, NavComponent, Statuscomponent, RiskComponent, HighlightsComponent,
    OverallStatusComponent, LegendComponent],
  providers: [InfoService, SlaStatusService, RiskService, HighlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
