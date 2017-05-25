import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { MetricsMasterService } from './metrics-master.service';
import { IProjectStatus } from './project-status';
import { IMetricsMaster } from './metrics-master';

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[];
  metricsMaster: IMetricsMaster[];

  constructor(public infoService: InfoService, public metricsService: MetricsMasterService) {
  }

  ngOnInit() {
    this.getMetricsMatserDetails();
    this.getProjectDetails();
  }
  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(
      data => this.projectStatus = data
    );
  }

  getMetricsMatserDetails(): void {
    this.metricsService.getMetricsMasterInfo().subscribe(
      data => this.metricsMaster = data
    );
  }
}


