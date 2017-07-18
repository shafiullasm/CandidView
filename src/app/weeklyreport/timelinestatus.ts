export interface TimelineData {
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
    workstream?: string;
}

