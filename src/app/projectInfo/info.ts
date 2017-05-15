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
  Cells: ICell;
}

export interface ICell {
  SLNo?:number;
  ProjectName?:string;
  ProgramName?:string;
  Owner?:string;
  TeamSize?:number;  
  Scope?: IMetrics;
  Schedule?:IMetrics;
  Quality?:IMetrics;
  SLA?:IMetrics;
  Remarks?:string;
}

export interface IMetrics {
  Background?: string;
  Editable?: Boolean;
}

