import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { MetricsMasterService } from './metrics-master.service';
import { IProjectStatus, IMetricColors } from './project-status';
import { IMetricsMaster } from './metrics-master';

@Component({
  selector: 'candid-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[];
  metricsMaster: IMetricsMaster[];
  metricColor: IMetricColors[];

  constructor(public infoService: InfoService, public metricsService: MetricsMasterService) {
  }

  ngOnInit() {
    this.getMetricsMatserDetails();
    this.getProjectDetails();
  }
  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(
      data => {
        this.projectStatus = data;
        this.processColors();
      }
    );
  }

  processColors() {
    this.projectStatus.forEach(element => {
      //ToDO Below object needs to be built based on the logic. Can use sub methods
      let objColor: IMetricColors = {
        scope: "Green",
        schedule: "Red"
      };
      element.colors = objColor;
    });
  }
  
  getMetricsMatserDetails(): void {
    this.metricsService.getMetricsMasterInfo().subscribe(
      data => this.metricsMaster = data
    );
  }
}


