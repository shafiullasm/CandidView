export class Info {
  id: any;
  name: string;
}

export interface IGridData {
  Columns: IColumn[];
  Rows: IRow[];
}

export interface IColumn {
  display?: string;
}

export interface IRow {
  Cells: ICell;
}

export interface ICell {
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


