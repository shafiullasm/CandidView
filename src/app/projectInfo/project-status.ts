export interface IProjectStatus {
  slno?: number;
  businessUnit?: string;
  programName?: string;
  owner?: string;
  teamSize?: number;
  scope?: number;
  schedule?: number;
  quality?: IMetricQuality;
  sla?: IMetricSLA;
  remarks?: string;
}

export interface IMetricQuality {
  defectLeakage?:number;
  productionDefect?:number;
  fdnDefects?:number;
  securityDefects?:number;
}
export interface IMetricSLA {
  scheduleAdherence?:number;
  defectDensityNonProd?:number;
  sev1DefectLeakageNonProd?:number;
  defectDensityProd?:number;
  sev1DefectLeakageProd?:number;
  sev2DefectLeakageProd?:number;
  defectRejectionRate?:number;
}


