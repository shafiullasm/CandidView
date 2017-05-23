export interface RiskData{
    Columns : IColumn[];
    Rows : IRow[];
}

export interface IColumn {
    display?: string;
}

export interface IRow{
    Cells: ICell;
}

export interface ICell {
    sno?:number;
    type?:string;
    description?:string;
    owner?:string;
    exposure?:string;
    status?:string;
}