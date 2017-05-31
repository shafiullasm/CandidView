import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { IProjectStatus, IMetricColors } from './project-status';

@Component({
  selector: 'candid-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[];
  metricColor: IMetricColors[];

  constructor(public infoService: InfoService) {
  }

  ngOnInit() {
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
      let objColor: IMetricColors = {
        scope: this.colorChangeForScope(element.scope),
        schedule: this.colorChangeForSchedule(element.schedule)
      };
      element.colors = objColor;
    });
  }

  colorChangeForScope(value: number): string {
    let bgcolor: string;
    if (value <= 90 && value >= 0) {
      bgcolor = 'Green';
    } else if (value > 90 && value <= 95) {
      bgcolor = 'Yellow';
    } else {
      bgcolor = 'Red';
    }
    return bgcolor;
  }

  colorChangeForSchedule(value: number): string {
    let bgcolor: string;
    if (value >= 0) {
      bgcolor = 'Green';
    } else if (value < 0 && value > -1) {
      bgcolor = 'Yellow';
    } else {
      bgcolor = 'Red';
    }
    return bgcolor;
  }
}


