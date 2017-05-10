import { Component, OnInit } from '@angular/core';
import { Info } from './info';
import { InfoService } from './info.service';

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  info: Info[];
  title: string;
  constructor(private infoService: InfoService) {
    this.title = "test";
    this.getProjectDetails();

  }

  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(x => this.info = x);

  }

  ngOnInit(): void {
    // this.getProjectDetails();
  }

}

