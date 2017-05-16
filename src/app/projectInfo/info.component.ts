import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service'
import { ProjectData } from './projectdata';
import { IGridData } from './info';
import { IHeader } from './header';

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html',
  styleUrls: ['./style.css'],
})
export class InfoComponent implements OnInit {
  currentDate: string = Date();
  projectdata: ProjectData;
  gridData: IGridData;
  headerData: IHeader;

  constructor(private infoService: InfoService) {
    this.projectdata = new ProjectData();
    this.gridData = this.projectdata.gridData;
    this.headerData = this.projectdata.headerData;
  }
  getProjectDetails(): void {
    // this.infoService.getProjectDetails().subscribe(x => this.info = x);
  }
  ngOnInit(): void {
    // this.getProjectDetails();
  }
}


