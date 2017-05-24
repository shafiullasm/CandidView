import { HighlightData } from './highlightstatus';
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

    

}