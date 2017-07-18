import { Component, OnInit } from '@angular/core';
import { HighlightsService } from './highlights.service';
import { IHighlightsStatus } from './highlights.status';

@Component({
    selector: 'candid-highlights-status',
    templateUrl: './highlights.html'
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

