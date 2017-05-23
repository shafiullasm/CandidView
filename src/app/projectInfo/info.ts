export interface IGridData {
  columns: IColumn[];
  rows: IRow[];
}

export interface IColumn {
  display?: string;
}

export interface IRow {
  slno?: number;
  projectName?: string;
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



