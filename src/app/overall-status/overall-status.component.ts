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
  isServiceError: string;
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
      },
      Error => {
        this.isServiceError = Error;
      }
    );
  }
  GetAllMetricDetails() {
    this.projectStatus.forEach(element => {
      this.calculateColorforOverAllStatus();
    });
  }

  calculateColorforOverAllStatus() {
    let colorScope = this.projectStatus.filter(element => element.colors.scope === 'Red').length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.scope === 'Yellow').length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.scope = colorScope;
    let colorSchedule = this.projectStatus.filter(element => element.colors.schedule === 'Red').length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.schedule === 'Yellow').length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.schedule = colorSchedule;
    let colorQuality = this.projectStatus.filter(element => element.colors.quality === 'Red').length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.quality === 'Yellow').length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.quality = colorQuality;
    let colorQualityEng = this.projectStatus.filter(element => element.colors.qualityEngineeringPractice === 'Red').length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.qualityEngineeringPractice === 'Yellow').length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.qualityengineeringpractice = colorQualityEng;
    let colorResource = this.projectStatus.filter(element => element.colors.resource === 'Red').length > 0 ? 'Red' :
      this.projectStatus.filter(element => element.colors.resource === 'Yellow').length > 0 ? 'Yellow' : 'Green';
    this.overallStatus.resource = colorResource;
  }
}
