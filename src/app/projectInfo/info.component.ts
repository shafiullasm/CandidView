import { Component, OnInit } from '@angular/core';
import { Info } from './info';
import { InfoService } from './info.service';
import { IGridData, IColumn, IRow, ICell } from './info';
import { IHeader, IData } from './header';

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
      Cells: {
        SLNo: 1,
        ProjectName: "RWT",
        ProgramName: "DC",
        Owner: "Kady",
        TeamSize: 4,
        Scope: {
          Background: "Green",
          Editable: true
        },
        Schedule: {
          Background: "Green",
          Editable: true
        },
        Quality: {
          Background: "Green",
          Editable: true
        },
        SLA: {
          Background: "Green",
          Editable: true
        },
        Remarks: "Code Issue"
      }
    },
    {
      Cells: {
        SLNo: 2,
        ProjectName: "SAC",
        ProgramName: "Trade",
        Owner: "Kady",
        TeamSize: 4,
        Scope: {
          Background: "Green",
          Editable: true
        },
        Schedule: {
          Background: "Green",
          Editable: true
        },
        Quality: {
          Background: "Green",
          Editable: true
        },
        SLA: {
          Background: "Green",
          Editable: true
        },
        Remarks: "Code Issue"
      }
    }]
  };

  headerData: IHeader =
  {
    status: [{
      Background: "Y",
      metricName: "Scope"
    },
    {
      Background: "Y",
      metricName: "Schedule"
    },
    {
      Background: "Y",
      metricName: "Quality"
    },
    {
      Background: "Y",
      metricName: "SLA"
    }]
  }
}