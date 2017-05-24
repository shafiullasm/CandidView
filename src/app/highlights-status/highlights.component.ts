import { Component, OnInit } from '@angular/core';
import { HighlightsService } from './highlights.service';
import { IHighlightsStatus } from './highlights.status';

@Component({
    selector: 'dash-highlights-status',
    templateUrl: './highlights.html',
    styleUrls: ['app/assets/style.css'],
})

export class HighlightsComponent implements OnInit {
    currentDate: string = Date();
    highlightsstatus: IHighlightsStatus[];

    constructor(public Highlights: HighlightsService) {
    }

    ngOnInit() {
        this.getProjectDetails();
    }
    getProjectDetails(): void {
        this.Highlights.getProjectDetails().subscribe(
            data => this.highlightsstatus = data
        );
    }
}