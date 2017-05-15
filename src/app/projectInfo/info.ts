export class Info {
  id: any;
  name: string;
}

export interface IGridData {
  Columns: IColumn[];
  Rows: IRow[];
}

export interface IColumn {
  Display?: string;
}

export interface IRow {
  Cells: ICell[];
}

export interface ICell {
  SLNo:string;
  ProjectName:string;
  ProgramName:string;
  Owner:string;
  TeamSize:number;  
  scope: IMetrics;
  Schedule:IMetrics;
  Quality:IMetrics;
  SLA:IMetrics;
  Remarks:IMetrics;
}

export interface IMetrics {
  Background?: string;
  Editable?: Boolean;
}

