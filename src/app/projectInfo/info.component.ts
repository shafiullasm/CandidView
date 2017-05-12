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
  projecttitle:IGridData[];
  Date1:string = Date();
  constructor(private infoService: InfoService) {
    //this.title = "Edit";
    this.getProjectDetails();

  }
 gridData:IGridData = 
  {
    Columns: [{
      Display:"Project"
    },
    {
      Display :"SLA"
    },
    {
      Display:"Schedule"
    },
    {
      Display:"Scope"
    },
    {
      Display:"Quality "
    }],

    Rows:[{
       // Data: [{
            Cells:[{
                Display:"RWT"               
              },              
              {
                Background:"Yellow",                
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
                Editable:true;               
              }]
         // }]
       },
       {
       // Data: [{
            Cells:[{
                Display:"SAC"                
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
       },
       {
       // Data: [{
            Cells:[{
                Display:"RPS"                
              },
              {
                Background:"Green"                
              },
              {
                Background:"Yellow"                
              },
              {
                Background:"Green"                
              },
              {
                Background:"Red"                
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

