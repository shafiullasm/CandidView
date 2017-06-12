import { Component, OnInit, Input } from '@angular/core';
import { SlaStatusService } from './sla-status.service';
import { IOverallStatus } from './overall-status';
import { IProjectStatus } from '../project-status/project-status';
@Component({
  selector: 'candid-overall',
  templateUrl: './overall-status.html'
})
export class OverallStatusComponent implements OnInit {
  overallStatus: IOverallStatus = {};
  @Input('projectStatus') projectStatus: IProjectStatus[];
  qualityColors: Array<string> = [];

  constructor(public slaService: SlaStatusService) {
  }
  ngOnInit() {
    this.GetSlaDetail();
    this.GetAllMetricDetails();
  }
  GetSlaDetail(): void {
    this.slaService.GetSlaDetail().subscribe(
      data => {
        this.overallStatus.sla = data;
      }
    );
  }
  GetAllMetricDetails() {
    this.projectStatus.forEach(element => {
      this.calculateColorforOverAllStatus();
    });
  }

  calculateColorforOverAllStatus() {
    let colorScope = this.projectStatus.filter(element => element.colors.scope).length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.scope).length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.scope = colorScope;
    let colorSchedule = this.projectStatus.filter(element => element.colors.schedule).length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.schedule).length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.schedule = colorSchedule;
    let colorQuality = this.projectStatus.filter(element => element.colors.quality).length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.quality).length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.quality = colorQuality;
    let colorQualityEng = this.projectStatus.filter(element => element.colors.qualityEngineeringPractice).length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.qualityEngineeringPractice).length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.qualityengineeringpractice = colorQualityEng;
    let colorResource = this.projectStatus.filter(element => element.colors.resource).length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.resource).length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.resource = colorResource;
  }
}
