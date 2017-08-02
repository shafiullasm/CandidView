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
      let scopeData = this.colorChangeForScope(element.scope, element.release);
      let scheduleData = this.colorChangeForSchedule(element.schedule);
      let qualityData = this.colorChangeForQuality(element.quality);
      let qualityEngineeringPractice = this.colorChangeForQualityEngineeringPractice(element.qualityEngineeringPractice);
      let resData = this.colorChangeForResource(element.resource.attrition, element.resource.availabilityofResource);
      let objColor: IMetricColors = {
        scope: scopeData.color,
        schedule: scheduleData.color,
        quality: qualityData.color,
        qualityEngineeringPractice: qualityEngineeringPractice.color,
        resource: resData.color,
        scopeRemarks: scopeData.remarks,
        scheduleRemarks: scheduleData.remarks,
        qualityRemarks: qualityData.remarks,
        qualityEngineeringRemarks: qualityEngineeringPractice.remarks,
        resourceRemarks: resData.color
      };
      let projStatus: IProjectStatus = new ProjectStatus();
      projStatus = element;
      projStatus.colors = objColor;
      this.projectStatus.push(projStatus);
    });
  }

  colorChangeForScope(scopeValues: IMetricScope, release: string): any {
    let Colors: Array<any> = [];
    let Remarks: Array<IMetricRemark> = [];

    if (scopeValues.backlogPresent.toUpperCase() === 'Y' || scopeValues.backlogPresent.toUpperCase() === 'YES') {
      Colors[0] = IEnumColors.Green;
    } else if (scopeValues.backlogPresent === 'P') {
      Colors[0] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Product backlog insufficient for next 3 sprints"));
    } else {
      Colors[0] = IEnumColors.Red;
      Remarks.push(this.formRemarks("Product backlog insufficient for next 2 sprints"));
    }

    if (scopeValues.stories.toUpperCase() === 'Y' || scopeValues.stories.toUpperCase() === 'YES') {
      Colors[1] = IEnumColors.Green;
    } else if (scopeValues.stories === 'P') {
      Colors[1] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Insufficient groomed stories for next sprint / stories have more than 5 points"));
    } else {
      Colors[1] = IEnumColors.Red;
      Remarks.push(this.formRemarks("No groomed stories for next sprint / stories have more than 5 points"));
    }

    if (scopeValues.developmentDependencies.toUpperCase() === 'Y' || scopeValues.developmentDependencies.toUpperCase() === 'YES') {
      Colors[2] = IEnumColors.Green;
    } else if (scopeValues.developmentDependencies.toUpperCase() === 'P') {
      Colors[2] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Dependencies identified partially / vague or no commitment on timelines from the dependent team on delivery"));
    } else {
      Colors[2] = IEnumColors.Red;
      Remarks.push(this.formRemarks("No dependencies identified /  no commitment on timelines from the dependent team on delivery"));
    }

    if (scopeValues.tgoDesign.toUpperCase() === 'Y' || scopeValues.tgoDesign.toUpperCase() === 'YES'
      || scopeValues.tgoDesign === 'NA' || ((scopeValues.tgoDesign.toUpperCase() === 'N' || scopeValues.tgoDesign.toUpperCase() === 'NO') &&
        scopeValues.noOfDaysFromStartDate < 15)) {
      Colors[3] = IEnumColors.Green;
    } else if ((scopeValues.tgoDesign.toUpperCase() === 'N' || scopeValues.tgoDesign.toUpperCase() === 'NO')
      && (scopeValues.noOfDaysFromStartDate >= 15 &&
        scopeValues.noOfDaysFromStartDate < 30)) {
      Colors[3] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("TGO Design pending for Release #" + release + " and #" + scopeValues.noOfDaysFromStartDate + " days over from project started"));
    } else {
      Colors[3] = IEnumColors.Red;
      Remarks.push(this.formRemarks("TGO Design pending for Release #" + release));
    }

    if (scopeValues.tgoConstruction.toUpperCase() === 'Y' || scopeValues.tgoConstruction.toUpperCase() === 'YES'
      || scopeValues.tgoConstruction === 'NA') {
      Colors[4] = IEnumColors.Green;
    } else if ((scopeValues.tgoConstruction.toUpperCase() === 'N' || scopeValues.tgoConstruction.toUpperCase() === 'NO')
      && (scopeValues.noOfDaysFromCodeFreezeDate > 30 &&
        scopeValues.noOfDaysFromCodeFreezeDate <= 45)) {
      Colors[4] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("TGO Construction pending for Release #" + release + " and #" + scopeValues.noOfDaysFromCodeFreezeDate + " more days left for code freeze"));
    } else {
      Colors[4] = IEnumColors.Red;
      Remarks.push(this.formRemarks("TGO Design pending for Release #" + release));
    }

    let bgcolor = this.overAllColor(Colors);
    let scopeData = { "color": bgcolor, "remarks": Remarks };
    return scopeData;
  }

  colorChangeForSchedule(value: number): any {
    let bgcolor: any;
    let Remarks: Array<IMetricRemark> = [];

    if (value >= 0) {
      bgcolor = IEnumColors.Green;
    } else if (value >= -1 && value < 0) {
      bgcolor = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("1 sprint short to meet schedule"));
    } else {
      bgcolor = IEnumColors.Red;
      Remarks.push(this.formRemarks("More than 1 sprint short to meet schedule"));
    }
    let scheduleData = { "color": bgcolor, "remarks": Remarks };
    return scheduleData;
  }

  colorChangeForQuality(qualityValues: IMetricQuality): any {
    let bgColor: string;
    let Colors: Array<any> = [];
    let Remarks: Array<IMetricRemark> = [];

    if (qualityValues.requirementTestCoverage >= 0) {
      Colors[0] = IEnumColors.Green;
    } else if (qualityValues.requirementTestCoverage >= -0.1 && qualityValues.requirementTestCoverage < 0) {
      Colors[0] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Few requirements are yet to tested"));
    } else {
      Colors[0] = IEnumColors.Red;
      Remarks.push(this.formRemarks("TestRequirementCovergae is low, many requirement yet to be tested"));
    }

    // if (qualityValues.averageLeadTime <= 0.2) {
    //   Colors[1] = IEnumColors.Green;
    // } else if (qualityValues.averageLeadTime > 0.2 && qualityValues.averageLeadTime < 0.5) {
    //   Colors[1] = IEnumColors.Yellow;
    //   Remarks.push(this.formRemarks(""));
    // } else {
    //   Colors[1] = IEnumColors.Red;
    //   Remarks.push(this.formRemarks(""));
    // }

    if (qualityValues.defectLeakageQA <= 0.2) {
      Colors[1] = IEnumColors.Green;
    } else if (qualityValues.defectLeakageQA > 0.2 && qualityValues.defectLeakageQA < 0.5) {
      Colors[1] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("QA defect leakage is moderatly higher then the desired level"));
    } else {
      Colors[1] = IEnumColors.Red;
      Remarks.push(this.formRemarks("QA defect leakage is higher then the desired level"));
    }

    if (qualityValues.productionDefect == 0) {
      Colors[2] = IEnumColors.Green;
    } else {
      Colors[2] = IEnumColors.Red;
      Remarks.push(this.formRemarks("Prod defect is greater than 0 - #" + qualityValues.productionDefect));
    }

    bgColor = this.overAllColor(Colors);

    let qtyData = { "color": bgColor, "remarks": Remarks };
    return qtyData;
  }

  colorChangeForQualityEngineeringPractice(qualityEngineering: IMetricQualityEngineeringPractice): any {
    let bgColor: any;
    let Colors: Array<any> = [];
    let Remarks: Array<IMetricRemark> = [];

    if (qualityEngineering.tddCoverage >= 80 || qualityEngineering.tddCoverage === 0) {
      Colors[0] = IEnumColors.Green;
    } else if (qualityEngineering.tddCoverage >= 70 && qualityEngineering.tddCoverage < 80) {
      Colors[0] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("TDD coverage is between 70% and 80%: " + qualityEngineering.tddCoverage + "%"));
    } else {
      Colors[0] = IEnumColors.Red;
      Remarks.push(this.formRemarks("TDD coverage is less then 70%: " + qualityEngineering.tddCoverage + "%"));
    }
    if (qualityEngineering.bddCoverage >= 80 || qualityEngineering.bddCoverage===0) {
      Colors[1] = IEnumColors.Green;
    } else if (qualityEngineering.bddCoverage >= 65 && qualityEngineering.bddCoverage < 80) {
      Colors[1] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("BDD coverage is between 65% and 80%: " + qualityEngineering.bddCoverage + "%"));
    } else {
      Colors[1] = IEnumColors.Red;
      Remarks.push(this.formRemarks("BDD coverage is less than 65%: " + qualityEngineering.bddCoverage + "%"));
    }
    if (qualityEngineering.mvpAdoption >= 2 || qualityEngineering.mvpAdoption === 0) {
      Colors[2] = IEnumColors.Green;
    } else if (qualityEngineering.mvpAdoption = 1) {
      Colors[2] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("One production release in last 6 months"));
    } else {
      Colors[2] = IEnumColors.Red;
      Remarks.push(this.formRemarks("No production release in last 6 months"));
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
      Remarks.push(this.formRemarks("Minor defects identified during  Dev code review"));
    } else if (qualityEngineering.codeReviewDev.catastrophic > 0 ||
      qualityEngineering.codeReviewDev.majorDefectsWithoutWorkaround > 0 ||
      qualityEngineering.codeReviewDev.majorDefectsWithWorkaround > 5) {
      Colors[3] = IEnumColors.Red;
      Remarks.push(this.formRemarks("Major defects identified during  Dev code review"));
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
      Remarks.push(this.formRemarks("Minor defects identified during  QA code review"));
    } else if (qualityEngineering.codeReviewQA.catastrophic > 0 ||
      qualityEngineering.codeReviewQA.majorDefectsWithoutWorkaround > 0 ||
      qualityEngineering.codeReviewQA.majorDefectsWithWorkaround > 5) {
      Colors[3] = IEnumColors.Red;
      Remarks.push(this.formRemarks("Major defects identified during  QA code review"));
    }
    if (qualityEngineering.maintainabilityIndex >= 60 || qualityEngineering.maintainabilityIndex === 0) {
      Colors[5] = IEnumColors.Green;
    } else {
      Colors[5] = IEnumColors.Red;
      Remarks.push(this.formRemarks("MI less than 60"));
    }
    if (qualityEngineering.cyclomaticComplexity <= 15 || qualityEngineering.cyclomaticComplexity === 0) {
      Colors[6] = IEnumColors.Green;
    } else {
      Colors[6] = IEnumColors.Red;
      Remarks.push(this.formRemarks("CC greater than 15"));
    }
    bgColor = this.overAllColor(Colors);

    let qtyData = { "color": bgColor, "remarks": Remarks };
    return qtyData;
  }

  colorChangeForResource(attrition: number, availabilityofResource: string): any {
    let bgColor: any;
    let Colors: Array<any> = [];
    let Remarks: Array<IMetricRemark> = [];

    if (attrition === 0) {
      Colors[0] = IEnumColors.Green;
    } else if (attrition == 1) {
      Colors[0] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Attrition of resources is equal to 1"));
    } else {
      Colors[0] = IEnumColors.Red;
      Remarks.push(this.formRemarks("Attrition of resources is greater than 1"));
    }
    if (availabilityofResource.toUpperCase() === 'YES') {
      Colors[1] = IEnumColors.Green;
    } else if (availabilityofResource.toUpperCase() === 'PARTIAL') {
      Colors[1] = IEnumColors.Yellow;
      Remarks.push(this.formRemarks("Partial availability of Resource with Required Skillset"));
    } else {
      Colors[1] = IEnumColors.Red;
      Remarks.push(this.formRemarks("No available Resource with Required Skillset"));
    }
    bgColor = this.overAllColor(Colors);

    let resData = { "color": bgColor, "remarks": Remarks };
    return resData;
  }

  overAllColor(Colors: Array<string>): string {
    let bgColor: any;
    bgColor = Colors.filter(element => <any>element === IEnumColors.Red).length > 0 ? IEnumColors.Red :
      Colors.filter(element => <any>element === IEnumColors.Yellow).length > 0 ? IEnumColors.Yellow : IEnumColors.Green;
    return bgColor;
  }

  formRemarks(reason: string): IMetricRemark {
    let remark: IMetricRemark = new MetricRemark();
    remark.reason = reason;
    return remark;
  }
}
