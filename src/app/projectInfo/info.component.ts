import { Component, OnInit } from '@angular/core';
import { Info } from './info';
import { InfoService } from './info.service';
import {IGridData} from './info' ;
import {IColumn} from './info' ;
//import {IRow} from './info' ;
import {IData} from './info' ;
import {ICell} from './info' ;

@Component({
  selector: 'dash-info',
  templateUrl: './info.component.html',
  styleUrls: ['./style.css'], 
            
})
export class InfoComponent implements OnInit {
  info: Info[];
  title: string;
  constructor(private infoService: InfoService) {
    this.title = "test";
    this.getProjectDetails();

  }
 gridData:IGridData = 
  {
    Columns: [{
      Display:"Project"
    },
    {
      Display :"Project Manager"
    },
    {
      Display:"Scope"
    },
    {
      Display:"Quality"
    },
    {
      Display:"Cost"
    },
    {
      Display:"Resource"
    },
    ],

    Rows:[{
       // Data: [{
            Cells:[{
                Display:"RWT"               
              },
              {
                Display:"Kady"                
              },
              {
                Background:"Yellow"                
              },
              {
                Background:"Green"                
              },
              {
                Background:"Red"                
              },
              {
                Background:"Green"                
              }]
         // }]
       },
       {
       // Data: [{
            Cells:[{
                Display:"SAC"                
              },
              {
                Display:"Anuradha",                
              },
              {
                Background:"Green"                
              },
              {
                Background:"Red"                
              },
              {
                Background:"Green"                
              },
              {
                Background:"Yellow"                
              }]
         // }]
       }
       ]
    };


  getProjectDetails(): void {
    this.infoService.getProjectDetails().subscribe(x => this.info = x);

  }

  ngOnInit(): void {
    // this.getProjectDetails();
  }

}

