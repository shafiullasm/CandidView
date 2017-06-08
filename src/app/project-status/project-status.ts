export interface IProjectStatus {
  slno?: number;
  buName?: string;
  programName?: string;
  owner?: string;
  teamSize?: number;
  scope?: number;
  schedule?: number;
  quality?: IMetricQuality;
  colors?: IMetricColors;
  qualityEngineeringPractice?: IMetricQualityEngineeringPractice;
  resource?: IResource;
}
export interface IMetricColors {
  scope?: string;
  schedule?: string;
  quality?: string;
  qualityEngineeringPractice?: string;
  resource?: string;
}
export interface IMetricQuality {
  requirementTestCoverage?: number;
  averageLeadTime?: number;
  defectLeakageQA?: number;
  productionDefect?: number;
}
export interface IMetricQualityEngineeringPractice {
  tddCoverage?: number;
  bddCoverage?: number;
  mvpAdoption?: number;
  codeReviewDev?: CodeReviewDev;
  codeReviewQA?: CodeReviewQA;
  maintainabilityIndex?: number;
  cyclomaticComplexity?: number;
}
export interface CodeReviewDev {
  catastrophic?: number;
  majorDefectsWithoutWorkaround?: number;
  majorDefectsWithWorkaround?: number;
  minorDefects?: number;
}
export interface CodeReviewQA {
  catastrophic?: number;
  majorDefectsWithoutWorkaround?: number;
  majorDefectsWithWorkaround?: number;
  minorDefects?: number;
}
export interface IResource {
  attrition?: number;
  availabilityofResource?: string;
}
export interface IMetricSLA {
  scheduleAdherence?: number;
  defectDensityNonProd?: number;
  sev1DefectLeakageNonProd?: number;
  defectDensityProd?: number;
  sev1DefectLeakageProd?: number;
  sev2DefectLeakageProd?: number;
  defectRejectionRate?: number;
}
export enum IEnumColors {
    Green,
    Yellow,
    Red
}


