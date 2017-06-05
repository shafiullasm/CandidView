import { Component, OnInit, Input } from '@angular/core';
import { SlaStatusService } from './sla-status.service';
import { IOverallStatus } from './overall-status';
import { IProjectStatus } from '../project-status/project-status';

@Component({
  selector: 'candid-overall',
  templateUrl: './overall-status.html'
})
export class OverallStatusComponent implements OnInit {
  overallStatus: IOverallStatus = {};
  @Input('projectStatus') projectStatus: IProjectStatus[];

  constructor(public slaService: SlaStatusService) {
  }

  ngOnInit() {
    this.GetSlaDetail();
    this.GetAllMetricDetails();
  }

  GetSlaDetail(): void {
    this.slaService.GetSlaDetail().subscribe(
      data => {
        this.overallStatus.sla = data;
      }
    );
  }

  GetAllMetricDetails() {
    this.projectStatus.forEach(element => {
      this.calculateColorforScope(element);
      this.calculateColorforSchedule(element);
    });
  }

  calculateColorforScope(element: IProjectStatus) {
    if (element.colors.scope.toUpperCase() === 'RED') {
      this.overallStatus.scope = 'Red';
    }
    if (element.colors.scope.toUpperCase() === 'YELLOW') {
      this.overallStatus.scope = 'Yellow';
    }
  }

  calculateColorforSchedule(element: IProjectStatus) {
    if (element.colors.schedule.toUpperCase() === 'RED') {
      this.overallStatus.schedule = 'Red';
    }
    if (element.colors.schedule.toUpperCase() === 'YELLOW') {
      this.overallStatus.schedule = 'Yellow';
    }
  }
}


