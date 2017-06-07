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
      let qualityValues: Array<number> = [element.quality.requirementTestCoverage, element.quality.averageLeadTime,
      element.quality.defectLeakageQA, element.quality.productionDefect];

      let qualityEngineering: Array<number> = [element.qualityEngineeringPractice.tddCoverage,
      element.qualityEngineeringPractice.bddCoverage,
      element.qualityEngineeringPractice.mvpAdoption,
      element.qualityEngineeringPractice.codeReviewDev.catastrophic,
      element.qualityEngineeringPractice.codeReviewDev.majorDefectsWithoutWorkaround,
      element.qualityEngineeringPractice.codeReviewDev.majorDefectsWithWorkaround,
      element.qualityEngineeringPractice.codeReviewDev.minorDefects,
      element.qualityEngineeringPractice.codeReviewQA.catastrophic,
      element.qualityEngineeringPractice.codeReviewQA.majorDefectsWithoutWorkaround,
      element.qualityEngineeringPractice.codeReviewQA.majorDefectsWithWorkaround,
      element.qualityEngineeringPractice.codeReviewQA.minorDefects,
      element.qualityEngineeringPractice.maintainabilityIndex,
      element.qualityEngineeringPractice.cyclomaticComplexity];

      let objColor: IMetricColors = {
        scope: this.colorChangeForScope(element.scope),
        schedule: this.colorChangeForSchedule(element.schedule),
        quality: this.colorChangeForQuality(qualityValues),
        qualityEngineeringPractice: this.colorChangeForQualityEngineeringPractice(qualityEngineering),
        resource: this.colorChangeForResource(element.resource.attrition, element.resource.availabilityofResource)
      };
      element.colors = objColor;
    });
  }

  colorChangeForScope(value: number): string {
    let bgcolor: string;
    if (value <= 90 && value >= 0) {
      bgcolor = 'Green';
    } else if (value >= 90 && value <= 95) {
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
  colorChangeForQuality(qualityValues: Array<number>): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (qualityValues[0] >= 0) {
      Colors[0] = 'Green';
    } else if (qualityValues[0] < 0 && qualityValues[0] >= -0.1) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }
    if (qualityValues[1] <= 0.2) {
      Colors[1] = 'Green';
    } else if (qualityValues[1] > 0.2 && qualityValues[1] < 0.5) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }
    if (qualityValues[2] <= 0.2) {
      Colors[2] = 'Green';
    } else if (qualityValues[2] > 0.2 && qualityValues[2] < 0.5) {
      Colors[2] = 'Yellow';
    } else {
      Colors[2] = 'Red';
    }
    if (qualityValues[3] <= 0.2) {
      Colors[3] = 'Green';
    } else {
      Colors[3] = 'Red';
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  overAllColor(Colors: Array<string>): string {
    let bgColor: string;
    Colors.forEach(value => {
      if (value === 'Red') {
        bgColor = 'Red';
      }
    });
    Colors.forEach(value => {
      if (value === 'Yellow') {
        bgColor = 'Yellow';
      }
    });
    if (bgColor == null) {
      bgColor = 'Green';
    }
    return bgColor;
  }
  colorChangeForQualityEngineeringPractice(qualityEngineering: Array<number>): string {
    let bgColor: string;
    let Colors: Array<string> = [];

    if (qualityEngineering[0] >= 95) {
      Colors[0] = 'Green';
    } else if (qualityEngineering[0] > 80 && qualityEngineering[0] <= 95) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }
    if (qualityEngineering[1] >= 80) {
      Colors[1] = 'Green';
    } else if (qualityEngineering[1] > 80 && qualityEngineering[1] <= 65) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }
    if (qualityEngineering[2] >= 2) {
      Colors[2] = 'Green';
    } else if (qualityEngineering[2] = 1) {
      Colors[2] = 'Yellow';
    } else {
      Colors[2] = 'Red';
    }
    if (qualityEngineering[3] && qualityEngineering[4] && qualityEngineering[5] && qualityEngineering[6] === 0) {
      Colors[3] = 'Green';
    } else if (qualityEngineering[3] && qualityEngineering[4] === 0 && qualityEngineering[5] < 0 && qualityEngineering[5] < 5) {
      Colors[3] = 'Yellow';
    } else {
      Colors[3] = 'Red';
    }
    if (qualityEngineering[7] && qualityEngineering[8] && qualityEngineering[9] && qualityEngineering[10] === 0) {
      Colors[4] = 'Green';
    } else if (qualityEngineering[7] && qualityEngineering[8] === 0 && qualityEngineering[9] < 0 && qualityEngineering[9] < 5) {
      Colors[4] = 'Yellow';
    } else {
      Colors[4] = 'Red';
    }
    if (qualityEngineering[11] >= 60) {
      Colors[5] = 'Green';
    } else {
      Colors[5] = 'Red';
    }
    if (qualityEngineering[12] <= 15) {
      Colors[6] = 'Green';
    } else {
      Colors[6] = 'Red';
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  colorChangeForResource(attrition: number, availabilityofResource: string): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (attrition === 0) {
      Colors[0] = 'Green';
    } else if (attrition < 0 && attrition >= 1) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }
    if (availabilityofResource === 'Yes') {
      Colors[1] = 'Green';
    } else if (availabilityofResource === 'Partial') {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }

}
