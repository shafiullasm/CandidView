import { Component } from '@angular/core';
import { StatusData } from './statusdata';
import { HighlightData } from './highlightstatus';
import { RiskComponent } from '../riskstatus/risk.component';

@Component({
  selector: 'weekly-info',
  templateUrl: './status.html',
  styleUrls: ['app/assets/style.css'],
})
export class Statuscomponent {
  currentDate: string = Date();
  statusdata: StatusData;
  highlightgridData: HighlightData;

  constructor() {
    this.statusdata = new StatusData();
    this.highlightgridData = this.statusdata.highlightGridData;

  }
}


