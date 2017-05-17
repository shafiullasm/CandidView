import { IGridData, IColumn, IRow, ICell } from './info';
import { IHeader, IData } from './header';

export class ProjectData {
    gridData: IGridData =
    {
        Columns: [{
            display: " # "
        },
        {
            display: "SchwabBU"
        },
        {
            display: "Program"
        },
        {
            display: "Owners"
        },
        {
            display: "TeamSize"
        },
        {
            display: "Scope"
        },
        {
            display: "Schedule"
        },
        {
            display: "Quality "
        },
        {
            display: "SLA"
        },
        {
            display: "Remarks"
        }],

        Rows: [{
            Cells: {
                slno: 1,
                projectName: "Retail Web Technology (RWT)",
                programName: "Equity Award Center (EAC) [Pankaj/Jay]",
                owner: "Shafi/Babu",
                teamSize: 33,
                scope: {
                    value: 0,
                    background: ""
                },
                schedule: {
                    value: 0,
                    background: ""
                },
                quality: {
                    value: 0,
                    background: ""
                },
                sla: {
                    value: 0,
                    background: ""
                },
                remarks: "Integration Issue - Pankaj*1"
            }
        },
        {
            Cells: {
                slno: 2,
                projectName: "Adviser Services (SAC)",
                programName: "Action Center [Nancy]",
                owner: "Manoj/Anu",
                teamSize: 4,
                scope: {
                    value: 0,
                    background: ""
                },
                schedule: {
                    value: 0,
                    background: ""
                },
                quality: {
                    value: 0,
                    background: ""
                },
                sla: {
                    value: 0,
                    background: ""
                },
                remarks: "Merge Issue -Andy Gray*2"
            }

        }]
    }

    headerData: IHeader =
    {
        status: [{
            metricName: "Scope",
            background: ""
        },
        {
            metricName: "Schedule",
            background: ""
        },
        {
            metricName: "Quality",
            background: ""
        },
        {
            metricName: "SLA",
            background: ""
        }]
    }
}



