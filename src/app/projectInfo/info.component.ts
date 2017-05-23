import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { MetricsMasterService } from './metrics-master.service';
import { IGridData } from './info';
import { IMetricsMaster } from './metrics-master';

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html',
  styleUrls: ['app/assets/style.css'],
})
export class InfoComponent implements OnInit {
  currentDate: string = Date();
  gridData: IGridData;
  metricsMaster[]: IMetricsMaster;

  constructor(public infoService: InfoService, public metricsService: MetricsMasterService) {
  }

  ngOnInit() {
    this.getMetricsMatserDetails();
    this.getProjectDetails();
  }
  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(
      data => this.gridData = data
    );
  }

  getMetricsMatserDetails(): void {
    this.metricsService.getMetricsMasterInfo().subscribe(
      data => this.metricsMaster = data
    );
  }
}


