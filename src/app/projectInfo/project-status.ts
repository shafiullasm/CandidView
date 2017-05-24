export interface IProjectStatus {
  slno?: number;
  businessUnit?: string;
  programName?: string;
  owner?: string;
  teamSize?: number;
  scope?: IMetrics;
  schedule?: IMetrics;
  quality?: IMetrics;
  sla?: IMetrics;
  remarks?: string;
}

export interface IMetrics {
  value?: number;
  background?: string;
}



