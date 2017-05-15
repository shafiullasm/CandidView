import { Component, OnInit } from '@angular/core';
import { Info } from './info';
import { InfoService } from './info.service';
import { IGridData, IColumn, IRow, ICell } from './info';

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html',
  styleUrls: ['./style.css']
})
export class InfoComponent implements OnInit {
  info: Info[];
  title: string;
  projecttitle: IGridData[];
  Date1: string = Date();
  constructor(private infoService: InfoService) {
    this.getProjectDetails();
  }
  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(x => this.info = x);
  }

  ngOnInit(): void {
    // this.getProjectDetails();
  }

  gridData: IGridData =
  {
    Columns: [{
      Display: "#"
    },
    {
      Display: "SchwabBU"
    },
    {
      Display: "Program"
    },
    {
      Display: "Owners"
    },
    {
      Display: "TeamSize"
    },
    {
      Display: "Scope"
    },
    {
      Display: "Schedule"
    },
    {
      Display: "Quality "
    },
    {
      Display: "SLA"
    },
    {
      Display: "Remarks"
    }],

    Rows: [{
      Cells: [{
        SLNo: 1;
        ProjectName: string;
        ProgramName: string;
        Owner: string;
        TeamSize: number;  
        scope: IMetrics;
        Schedule: IMetrics;
        Quality: IMetrics;
        SLA: IMetrics;
        Remarks: IMetrics;
        Background: "None",
        Editable: false
      },
      {
        Display: "",
        Background: "Green",
        Editable: true
      }]
    },
    {
      Cells: [{
        Display: "SAC",
        Background: "None",
        Editable: false
      },
      {
        Display: "",
        Background: "Green",
        Editable: false
      }]
    }]
  };
}

// {
//   // Data: [{
//   Cells: [{
//     Display: "SAC"
//   },
//   {
//     Background: "Green"
//   },
//   {
//     Background: "Red"
//   },
//   {
//     Background: "Green"
//   },
//   {
//     Background: "Yellow"
//   }]
//   // }]
// },
// {
//   // Data: [{
//   Cells: [{
//     Display: "RPS"
//   },
//   {
//     Background: "Green"
//   },
//   {
//     Background: "Yellow"
//   },
//   {
//     Background: "Green"
//   },
//   {
//     Background: "Red"
//   }]
//   // }]
// }




