import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { InfoComponent } from './projectinfo/info.component';
import {InfoService} from  './projectinfo/info.service';

@NgModule({
  imports:      [ BrowserModule,HttpModule ],
  declarations: [ AppComponent,InfoComponent ],
  providers: [InfoService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
