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

  getProjectDetails() {
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
        scope: this.colorChangeForScope(element.scope),
        schedule: this.colorChangeForSchedule(element.schedule)
      };
      element.colors = objColor;
    });
  }

  getMetricsMatserDetails(): void {
    this.metricsService.getMetricsMasterInfo().subscribe(
      data => this.metricsMaster = data
    );
  }


  colorChangeForScope(value: number): string {
    let bgcolor: string;
    if (value <= 90 && value >= 0) {
      bgcolor = "Green";
    }
    else if (value > 90 && value <= 95) {
      bgcolor = "Yellow";
    }
    else {
      bgcolor = "Red";
    }
    return bgcolor;
  }

  colorChangeForSchedule(value: number): string {
    let bgcolor: string;
    if (value >= 0) {
      bgcolor = "Green";
    }
    else if (value < 0 && value > -1) {
      bgcolor = "Yellow";
    }
    else {
      bgcolor = "Red";
    }
    return bgcolor;
  }
}


