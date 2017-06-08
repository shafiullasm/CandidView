import { Component, OnInit } from '@angular/core';
import { ProjectStatusService } from './project-status.service';
import { IProjectStatus, IMetricColors, IMetricQuality, IMetricQualityEngineeringPractice, IEnumColors } from './project-status';

@Component({
  selector: 'candid-status',
  templateUrl: './project-status.component.html'
})
export class ProjectStatusComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[];
  metricColor: IMetricColors[];
  buName: Array<string> = [];

  constructor(public projectStatusService: ProjectStatusService) { }
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
      bgcolor = IEnumColors[0];
    } else if (value >= 90 && value <= 95) {
      bgcolor = IEnumColors[1];
    } else {
      bgcolor = IEnumColors[2];
    }
    return bgcolor;
  }
  colorChangeForSchedule(value: number): string {
    let bgcolor: string;
    if (value >= 0) {
      bgcolor = IEnumColors[0];
    } else if (value < 0 && value > -1) {
      bgcolor = IEnumColors[1];
    } else {
      bgcolor = IEnumColors[2];
    }
    return bgcolor;
  }
  colorChangeForQuality(qualityValues: IMetricQuality): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (qualityValues.requirementTestCoverage >= 0) {
      Colors[0] = IEnumColors[0];
    } else if (qualityValues.requirementTestCoverage < 0 && qualityValues.requirementTestCoverage >= -0.1) {
      Colors[0] = IEnumColors[1];
    } else {
      Colors[0] = IEnumColors[2];
    }
    if (qualityValues.averageLeadTime <= 0.2) {
      Colors[1] = IEnumColors[0];
    } else if (qualityValues.averageLeadTime > 0.2 && qualityValues.averageLeadTime < 0.5) {
      Colors[1] = IEnumColors[1];
    } else {
      Colors[1] = IEnumColors[2];
    }
    if (qualityValues.defectLeakageQA <= 0.2) {
      Colors[2] = IEnumColors[0];
    } else if (qualityValues.defectLeakageQA > 0.2 && qualityValues.defectLeakageQA < 0.5) {
      Colors[2] = IEnumColors[1];
    } else {
      Colors[2] = IEnumColors[2];
    }
    if (qualityValues.productionDefect <= 0.2) {
      Colors[3] = IEnumColors[0];
    } else {
      Colors[3] = IEnumColors[2];
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  overAllColor(Colors: Array<string>): string {
    let bgColor: string;
    Colors.forEach(value => {
      if (value === IEnumColors[2]) {
        bgColor = IEnumColors[2];
      }
    });
    Colors.forEach(value => {
      if (value === IEnumColors[1]) {
        bgColor = IEnumColors[1];
      }
    });
    if (bgColor == null) {
      bgColor = IEnumColors[0];
    }
    return bgColor;
  }
  colorChangeForQualityEngineeringPractice(qualityEngineering: IMetricQualityEngineeringPractice): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (qualityEngineering.tddCoverage >= 95) {
      Colors[0] = IEnumColors[0];
    } else if (qualityEngineering.tddCoverage > 80 && qualityEngineering.tddCoverage <= 95) {
      Colors[0] = IEnumColors[1];
    } else {
      Colors[0] = IEnumColors[2];
    }
    if (qualityEngineering.bddCoverage >= 80) {
      Colors[1] = IEnumColors[0];
    } else if (qualityEngineering.bddCoverage > 80 && qualityEngineering.bddCoverage <= 65) {
      Colors[1] = IEnumColors[1];
    } else {
      Colors[1] = IEnumColors[2];
    }
    if (qualityEngineering.mvpAdoption >= 2) {
      Colors[2] = IEnumColors[0];
    } else if (qualityEngineering.mvpAdoption = 1) {
      Colors[2] = IEnumColors[1];
    } else {
      Colors[2] = IEnumColors[2];
    }
    if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewDev.minorDefects === 0) {
      Colors[3] = IEnumColors[0];
    } else if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround < 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround < 5) {
      Colors[3] = IEnumColors[1];
    } else {
      Colors[3] = IEnumColors[2];
    }
    if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewQA.minorDefects === 0) {
      Colors[4] = IEnumColors[0];
    } else if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround < 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround < 5) {
      Colors[4] = IEnumColors[1];
    } else {
      Colors[4] = IEnumColors[2];
    }
    if (qualityEngineering.maintainabilityIndex >= 60) {
      Colors[5] = IEnumColors[0];
    } else {
      Colors[5] = IEnumColors[2];
    }
    if (qualityEngineering.cyclomaticComplexity <= 15) {
      Colors[6] = IEnumColors[0];
    } else {
      Colors[6] = IEnumColors[2];
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  colorChangeForResource(attrition: number, availabilityofResource: string): string {
    let bgColor: string;
    let Colors: Array<string> = [];
    if (attrition === 0) {
      Colors[0] = IEnumColors[0];
    } else if (attrition < 0 && attrition >= 1) {
      Colors[0] = IEnumColors[1];
    } else {
      Colors[0] = IEnumColors[2];
    }
    if (availabilityofResource === 'Yes') {
      Colors[1] = IEnumColors[0];
    } else if (availabilityofResource === 'Partial') {
      Colors[1] = IEnumColors[1];
    } else {
      Colors[1] = IEnumColors[2];
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }

}
