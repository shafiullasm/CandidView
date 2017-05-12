export class Info {
  id: any;
  name: string;
}

export interface IGridData {

  Columns :IColumn[] ;
  Rows : IData[];
}

export interface IColumn {
  Display:string;
}

//export interface IRow {

  //Data : IData[] ;
//}

export interface IData {
  Cells:ICell[];
}
export interface ICell {
  Display ?: string ;
  Background?: string ;
  Editable?: Boolean;
}
