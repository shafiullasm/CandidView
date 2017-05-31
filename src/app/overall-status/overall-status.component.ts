import { Component, OnInit } from '@angular/core';
import { SlaStatusService } from './sla-status.service';
import { IOverallStatus } from './overall-status';

@Component({
  selector: 'candid-overall',
  templateUrl: './overall-status.html'
})
export class OverallStatusComponent implements OnInit {
  overallStatus: IOverallStatus = {};

  constructor(public slaService: SlaStatusService) {
  }

  ngOnInit() {
    this.GetSlaDetail();
  }

  GetSlaDetail(): void {
    this.slaService.GetSlaDetail().subscribe(
      data => {
        this.overallStatus.sla = data;
      }
    );
  }
}


