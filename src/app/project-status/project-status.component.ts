import { Component, OnInit } from '@angular/core';
import { ProjectStatusService } from './project-status.service';
import { IProjectStatus, IMetricColors } from './project-status';

@Component({
  selector: 'candid-status',
  templateUrl: './project-status.component.html'
})
export class ProjectStatusComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[];
  metricColor: IMetricColors[];
  buName: Array<string> = [];

  constructor(public projectStatusService: ProjectStatusService) {
  }

  ngOnInit() {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.projectStatusService.getProjectDetails().subscribe(
      data => {
        this.projectStatus = data;
        this.processColors();
        let i = 0;
        let name: string;
        this.projectStatus.forEach(element => {
          if (i === 0) {
            this.buName[i] = element.buName;
            name = this.buName[i];
            i++;
          } else {
            if (name !== element.buName) {
              this.buName[i] = element.buName;
              i++;
            }
          }
        });
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


