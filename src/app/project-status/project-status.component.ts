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
        schedule: this.colorChangeForSchedule(element.schedule),
        quality: this.colorChangeForQuality(element.quality.requirementTestCoverage,
          element.quality.averageLeadTime, element.quality.defectLeakageQA, element.quality.productionDefect)

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

  colorChangeForQuality(requirementTestCoverage: number, averageLeadTime: number,
    defectLeakageQA: number, productionDefect: number): string {
    let bgColor: string;
    let Colors: Array<string> = [];

    if (requirementTestCoverage >= 0) {
      Colors[0] = 'Green';
    } else if (requirementTestCoverage > 0 && requirementTestCoverage >= -0.1) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }

    if (averageLeadTime <= 0.2) {
      Colors[1] = 'Green';
    } else if (averageLeadTime > 0.2 && averageLeadTime < 0.5) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }

    if (defectLeakageQA <= 0.2) {
      Colors[1] = 'Green';
    } else if (defectLeakageQA > 0.2 && defectLeakageQA < 0.5) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }

    if (productionDefect <= 0.2) {
      Colors[2] = 'Green';
    } else {
      Colors[2] = 'Red';
    }

    for (let i = 0; Colors[i] != null; i++) {
      if (Colors[i] === 'Red') {
        bgColor = 'Red';
        break;
      }
    }
    if (bgColor == null) {
      for (let i = 0; Colors[i] != null; i++) {
        if (Colors[i] === 'Yellow') {
          bgColor = 'Yellow';
          break;
        }
      }
    }
    if (bgColor == null) {
      bgColor = 'Green';
    }
    return bgColor;
  }
}
