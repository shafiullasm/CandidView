export interface HighlightData {
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
    accomplishments?: string;
    inprogress?: string;
    upcommingmilestones?: string;
}
