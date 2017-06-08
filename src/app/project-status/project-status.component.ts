import { Component, OnInit } from '@angular/core';
import { ProjectStatusService } from './project-status.service';
import { IProjectStatus, IMetricColors, IMetricQuality, IMetricQualityEngineeringPractice } from './project-status';

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
    enum Colors {
      Green = 0,
      Yellow = 1,
      Red = 2
    }
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
      let qualityValues: IMetricQuality = element.quality;
      let qualityEngineering: IMetricQualityEngineeringPractice = element.qualityEngineeringPractice;
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
  colorChangeForQuality(qualityValues: IMetricQuality): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (qualityValues.requirementTestCoverage >= 0) {
      Colors[0] = 'Green';
    } else if (qualityValues.requirementTestCoverage < 0 && qualityValues.requirementTestCoverage >= -0.1) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }
    if (qualityValues.averageLeadTime <= 0.2) {
      Colors[1] = 'Green';
    } else if (qualityValues.averageLeadTime > 0.2 && qualityValues.averageLeadTime < 0.5) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }
    if (qualityValues.defectLeakageQA <= 0.2) {
      Colors[2] = 'Green';
    } else if (qualityValues.defectLeakageQA > 0.2 && qualityValues.defectLeakageQA < 0.5) {
      Colors[2] = 'Yellow';
    } else {
      Colors[2] = 'Red';
    }
    if (qualityValues.productionDefect <= 0.2) {
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
  colorChangeForQualityEngineeringPractice(qualityEngineering: IMetricQualityEngineeringPractice): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (qualityEngineering.tddCoverage >= 95) {
      Colors[0] = 'Green';
    } else if (qualityEngineering.tddCoverage > 80 && qualityEngineering.tddCoverage <= 95) {
      Colors[0] = 'Yellow';
    } else {
      Colors[0] = 'Red';
    }
    if (qualityEngineering.bddCoverage >= 80) {
      Colors[1] = 'Green';
    } else if (qualityEngineering.bddCoverage > 80 && qualityEngineering.bddCoverage <= 65) {
      Colors[1] = 'Yellow';
    } else {
      Colors[1] = 'Red';
    }
    if (qualityEngineering.mvpAdoption >= 2) {
      Colors[2] = 'Green';
    } else if (qualityEngineering.mvpAdoption = 1) {
      Colors[2] = 'Yellow';
    } else {
      Colors[2] = 'Red';
    }
    if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewDev.minorDefects === 0) {
      Colors[3] = 'Green';
    } else if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround < 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround < 5) {
      Colors[3] = 'Yellow';
    } else {
      Colors[3] = 'Red';
    }
    if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewQA.minorDefects === 0) {
      Colors[4] = 'Green';
    } else if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround < 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround < 5) {
      Colors[4] = 'Yellow';
    } else {
      Colors[4] = 'Red';
    }
    if (qualityEngineering.maintainabilityIndex >= 60) {
      Colors[5] = 'Green';
    } else {
      Colors[5] = 'Red';
    }
    if (qualityEngineering.cyclomaticComplexity <= 15) {
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
