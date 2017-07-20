import { Component, OnInit } from '@angular/core';
import { ProjectStatusService } from './project-status.service';
import {
  ProjectStatus, IProjectStatus, IMetricColors, IMetricQuality, IMetricScope,
  IMetricQualityEngineeringPractice, IEnumColors, IMetricRemark, MetricRemark
} from './project-status';

@Component({
  selector: 'candid-status',
  templateUrl: './project-status.component.html'
})
export class ProjectStatusComponent implements OnInit {
  currentDate: string = Date();
  projectStatus: IProjectStatus[] = new Array();
  metricColor: IMetricColors[];
  buName: Array<string> = [];
  isServiceError: boolean;

  constructor(public projectStatusService: ProjectStatusService) { }
  ngOnInit() {
    this.getProjectDetails();
  }
  getProjectDetails() {
    this.projectStatusService.getProjectDetails().subscribe(
      data => {
        this.processColors(data);
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
      },
      Error => {
        this.isServiceError = Error;
      }
    );
  }
  processColors(data: IProjectStatus[]) {
    data.forEach(element => {
      let scopeData = this.colorChangeForScope(element.scope);
      let objColor: IMetricColors = {
        scope: scopeData.color,
        schedule: this.colorChangeForSchedule(element.schedule),
        quality: this.colorChangeForQuality(element.quality),
        qualityEngineeringPractice: this.colorChangeForQualityEngineeringPractice(element.qualityEngineeringPractice),
        resource: this.colorChangeForResource(element.resource.attrition, element.resource.availabilityofResource),
        scopeRemarks: scopeData.remarks
      };
      let projStatus: IProjectStatus = new ProjectStatus();
      projStatus = element;
      projStatus.colors = objColor;
      this.projectStatus.push(projStatus);
    });
  }

  colorChangeForScope(scopeValues: IMetricScope): any {
    let Colors: Array<any> = [];
    let Remarks: Array<IMetricRemark> = [];

    let scopeRemark: IMetricRemark = new MetricRemark();
    if (scopeValues.backlogPresent.toUpperCase() === 'Y' || scopeValues.backlogPresent.toUpperCase() === 'YES') {
      Colors[0] = IEnumColors.Green;
    } else if (scopeValues.backlogPresent === 'P') {
      Colors[0] = IEnumColors.Yellow;
      scopeRemark.reason = "Partial avaialability of Backlog for atleast 2 sprint";
      Remarks.push(scopeRemark);
    } else {
      Colors[0] = IEnumColors.Red;
      scopeRemark.reason = "Do not have atleast 2 sprints worth of Backlog";
      Remarks.push(scopeRemark);
    }

    scopeRemark = new MetricRemark();
    if (scopeValues.stories.toUpperCase() === 'Y' || scopeValues.stories.toUpperCase() === 'YES') {
      Colors[1] = IEnumColors.Green;
    } else if (scopeValues.stories === 'P') {
      Colors[1] = IEnumColors.Yellow;
      scopeRemark.reason = "Few User stories are not well defined and A/Cs are not created for the upcoming 1st sprint and few stories are not below 5 story points";
      Remarks.push(scopeRemark);
    } else {
      Colors[1] = IEnumColors.Red;
      scopeRemark.reason = "All User stories are not well defined and A/Cs are not created for the upcoming 1st sprint and all stories are not below 5 story points";
      Remarks.push(scopeRemark);
    }
    
    scopeRemark = new MetricRemark();
    if (scopeValues.developmentDependencies.toUpperCase() === 'Y' || scopeValues.developmentDependencies.toUpperCase() === 'YES') {
      Colors[2] = IEnumColors.Green;
    } else if (scopeValues.developmentDependencies.toUpperCase() === 'P') {
      Colors[2] = IEnumColors.Yellow;
      scopeRemark.reason = "Few Development Dependencies are not identified for the upcoming sprint and there is no impact on timelines committed by the dependent team";
      Remarks.push(scopeRemark);
    } else {
      Colors[2] = IEnumColors.Red;
      scopeRemark.reason = "All Development Dependencies are not identified for the upcoming sprint and there is impact on timelines committed by the dependent team";
      Remarks.push(scopeRemark);
    }
    
    scopeRemark = new MetricRemark();
    if (scopeValues.tgoDesign.toUpperCase() === 'Y' || scopeValues.tgoDesign.toUpperCase() === 'YES'
      || scopeValues.tgoDesign === 'NA' || ((scopeValues.tgoDesign.toUpperCase() === 'N' || scopeValues.tgoDesign.toUpperCase() === 'NO') &&
        scopeValues.noOfDaysFromStartDate < 15)) {
      Colors[3] = IEnumColors.Green;
    } else if ((scopeValues.tgoDesign.toUpperCase() === 'N' || scopeValues.tgoDesign.toUpperCase() === 'NO')
      && (scopeValues.noOfDaysFromStartDate >= 15 &&
        scopeValues.noOfDaysFromStartDate < 30)) {
      Colors[3] = IEnumColors.Yellow;
      scopeRemark.reason = "Pending TGO Design review and #" + scopeValues.noOfDaysFromStartDate + " days over from project start date";
      Remarks.push(scopeRemark);
    } else {
      Colors[3] = IEnumColors.Red;
      scopeRemark.reason = "Pending TGO Design review";
      Remarks.push(scopeRemark);
    }

    scopeRemark = new MetricRemark();
    if (scopeValues.tgoConstruction.toUpperCase() === 'Y' || scopeValues.tgoConstruction.toUpperCase() === 'YES'
      || scopeValues.tgoConstruction === 'NA') {
      Colors[4] = IEnumColors.Green;
    } else if ((scopeValues.tgoConstruction.toUpperCase() === 'N' || scopeValues.tgoConstruction.toUpperCase() === 'NO')
      && (scopeValues.noOfDaysFromCodeFreezeDate > 30 &&
        scopeValues.noOfDaysFromCodeFreezeDate <= 45)) {
      Colors[4] = IEnumColors.Yellow;
      scopeRemark.reason = "Pending TGO Construction review and #" + scopeValues.noOfDaysFromCodeFreezeDate + " days left for code freeze";
      Remarks.push(scopeRemark);
    } else {
      Colors[4] = IEnumColors.Red;
      scopeRemark.reason = "Pending TGO Construction review";
      Remarks.push(scopeRemark);
    }
    
    let bgcolor = this.overAllColor(Colors);
    let scopeData = { "color": bgcolor, "remarks": Remarks };
    return scopeData;
  }


  colorChangeForSchedule(value: number): string {
    let bgcolor: any;
    if (value >= 0) {
      bgcolor = IEnumColors.Green;
    } else if (value < 0 && value > -1) {
      bgcolor = IEnumColors.Yellow;
    } else {
      bgcolor = IEnumColors.Red;
    }
    return bgcolor;
  }
  colorChangeForQuality(qualityValues: IMetricQuality): string {
    let bgColor: any;
    let Colors: Array<any> = [];
    if (qualityValues.requirementTestCoverage >= 0) {
      Colors[0] = IEnumColors.Green;
    } else if (qualityValues.requirementTestCoverage < 0 && qualityValues.requirementTestCoverage >= -0.1) {
      Colors[0] = IEnumColors.Yellow;
    } else {
      Colors[0] = IEnumColors.Red;
    }
    if (qualityValues.averageLeadTime <= 0.2) {
      Colors[1] = IEnumColors.Green;
    } else if (qualityValues.averageLeadTime > 0.2 && qualityValues.averageLeadTime < 0.5) {
      Colors[1] = IEnumColors.Yellow;
    } else {
      Colors[1] = IEnumColors.Red;
    }
    if (qualityValues.defectLeakageQA <= 0.2) {
      Colors[2] = IEnumColors.Green;
    } else if (qualityValues.defectLeakageQA > 0.2 && qualityValues.defectLeakageQA < 0.5) {
      Colors[2] = IEnumColors.Yellow;
    } else {
      Colors[2] = IEnumColors.Red;
    }
    if (qualityValues.productionDefect <= 0.2) {
      Colors[3] = IEnumColors.Green;
    } else {
      Colors[3] = IEnumColors.Red;
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  overAllColor(Colors: Array<string>): string {
    let bgColor: any;
    bgColor = Colors.filter(element => <any>element === IEnumColors.Red).length > 0 ? IEnumColors.Red :
      Colors.filter(element => <any>element === IEnumColors.Yellow).length > 0 ? IEnumColors.Yellow : IEnumColors.Green;
    return bgColor;
  }
  colorChangeForQualityEngineeringPractice(qualityEngineering: IMetricQualityEngineeringPractice): string {
    let bgColor: any;
    let Colors: Array<any> = [];
    if (qualityEngineering.tddCoverage >= 80) {
      Colors[0] = IEnumColors.Green;
    } else if (qualityEngineering.tddCoverage >= 70 && qualityEngineering.tddCoverage < 80) {
      Colors[0] = IEnumColors.Yellow;
    } else {
      Colors[0] = IEnumColors.Red;
    }
    if (qualityEngineering.bddCoverage >= 80) {
      Colors[1] = IEnumColors.Green;
    } else if (qualityEngineering.bddCoverage >= 65 && qualityEngineering.bddCoverage < 80) {
      Colors[1] = IEnumColors.Yellow;
    } else {
      Colors[1] = IEnumColors.Red;
    }
    if (qualityEngineering.mvpAdoption >= 2) {
      Colors[2] = IEnumColors.Green;
    } else if (qualityEngineering.mvpAdoption = 1) {
      Colors[2] = IEnumColors.Yellow;
    } else {
      Colors[2] = IEnumColors.Red;
    }
    if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewDev.minorDefects === 0) {
      Colors[3] = IEnumColors.Green;
    } else if (qualityEngineering.codeReviewDev.catastrophic === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround < 5) {
      Colors[3] = IEnumColors.Yellow;
    } else if (qualityEngineering.codeReviewDev.catastrophic > 0 ||
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround > 0 ||
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround > 5) {
      Colors[3] = IEnumColors.Red;
    }
    if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround === 0 &&
      qualityEngineering.codeReviewQA.minorDefects === 0) {
      Colors[4] = IEnumColors.Green;
    } else if (qualityEngineering.codeReviewQA.catastrophic === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround === 0 &&
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround < 5) {
      Colors[4] = IEnumColors.Yellow;
    } else if (qualityEngineering.codeReviewQA.catastrophic > 0 ||
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround > 0 ||
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround > 5) {
      Colors[3] = IEnumColors.Red;
    }
    if (qualityEngineering.maintainabilityIndex >= 60) {
      Colors[5] = IEnumColors.Green;
    } else {
      Colors[5] = IEnumColors.Red;
    }
    if (qualityEngineering.cyclomaticComplexity <= 15) {
      Colors[6] = IEnumColors.Green;
    } else {
      Colors[6] = IEnumColors.Red;
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }
  colorChangeForResource(attrition: number, availabilityofResource: string): string {
    let bgColor: any;
    let Colors: Array<any> = [];
    if (attrition === 0) {
      Colors[0] = IEnumColors.Green;
    } else if (attrition < 0 && attrition >= 1) {
      Colors[0] = IEnumColors.Yellow;
    } else {
      Colors[0] = IEnumColors.Red;
    }
    if (availabilityofResource === 'Yes') {
      Colors[1] = IEnumColors.Green;
    } else if (availabilityofResource === 'Partial') {
      Colors[1] = IEnumColors.Yellow;
    } else {
      Colors[1] = IEnumColors.Red;
    }
    bgColor = this.overAllColor(Colors);
    return bgColor;
  }

}
