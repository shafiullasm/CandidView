import { HighlightData } from './highlightstatus';
import { RiskData } from './riskstatus';
import { TimelineData } from './timelinestatus';


export class StatusData {
    highlightGridData: HighlightData =
    {
        Columns: [
            {
                display: "Accomplishments"
            },
            {
                display: "InProgress"
            },
            {
                display: "Upcomming Milestones"
            }],
        Rows: [
            {
                Cells: {
                    accomplishments: "Completed",
                    inprogress: "InProgress",
                    upcommingmilestones: "Upcomming"
                }
            },
            {
                Cells: {
                    accomplishments: "InComplete",
                    inprogress: "InProgress",
                    upcommingmilestones: "Upcomming"
                }
            },
            {
                Cells: {
                    accomplishments: "Completed",
                    inprogress: "InProgress",
                    upcommingmilestones: "Upcomming"
                }
            }]
    }

    riskGridData: RiskData =
    {
        Columns: [
            {
                display: "#"
            },
            {
                display: "Type"
            },
            {
                display: "Description"
            },
            {
                display: "Owner"
            },
            {
                display: "Exposure/Severity"
            },
            {
                display: "Status"
            }],
        Rows: [
            {
                Cells: {
                    sno: 1,
                    type: "",
                    description: "",
                    owner: "",
                    exposure: "",
                    status: ""
                }
            },
            {
                Cells: {
                    sno: 2,
                    type: "",
                    description: "",
                    owner: "",
                    exposure: "",
                    status: ""
                }
            },
            {
                Cells: {
                    sno: 3,
                    type: "",
                    description: "",
                    owner: "",
                    exposure: "",
                    status: ""
                }
            },
            {
                Cells: {
                    sno: 4,
                    type: "",
                    description: "",
                    owner: "",
                    exposure: "",
                    status: ""
                }
            },
            {
                Cells: {
                    sno: 5,
                    type: "",
                    description: "",
                    owner: "",
                    exposure: "",
                    status: ""
                }
            }]
    }

    // timelineGridData: TimelineData 
    // {
    //      Columns:[
    //         {
    //             display:"WorkStream"
    //         },
    //         {
    //             display:"Sprint Completion 4/19"
    //         },
    //         {
    //             display:"Code Freeze 4/20"
    //         },
    //         {
    //             display:"Rel.Integration 4/24"
    //         },
    //         {
    //             display:"UAT 5/4"
    //         },
    //          {
    //             display:" Pre-Prod 5/8"
    //         },
    //          {
    //             display:"Prod 5/17"
    //         }],

    // }


}