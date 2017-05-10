import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { InfoComponent } from './projectinfo/info.component';
import { InfoService } from './projectinfo/info.service';
import { routing } from './app.routing';
import { NavComponent } from './shared/nav.component';

@NgModule({
  imports: [BrowserModule, HttpModule, routing],
  declarations: [AppComponent, InfoComponent, NavComponent],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
