import { Component } from '@angular/core';
import { RiskComponent } from '../riskstatus/risk.component';

@Component({
  selector: 'weekly-info',
  templateUrl: './status.html',
  styleUrls: ['app/assets/style.css'],
})

export class Statuscomponent {
  currentDate: string = Date();
  constructor() { }
}


