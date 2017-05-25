import { Component, OnInit } from '@angular/core';
import { RiskService } from './risk.service';
import { IRiskStatus } from './risk.status';

@Component({
    selector: 'dash-risk-status',
    templateUrl: './risk.component.html'
})
export class RiskComponent implements OnInit {
    riskStatus: IRiskStatus[];

    constructor(public riskService: RiskService) {
    }

    ngOnInit() {
        this.getProjectDetails();
    }
    getProjectDetails(): void {
        this.riskService.getProjectDetails().subscribe(
            data => this.riskStatus = data
        );
    }
}


