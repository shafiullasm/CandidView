import { Component } from '@angular/core';
import { InfoComponent }      from './projectInfo/info.component';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}
  <my-info></my-info></h1>`
})
export class AppComponent { name = 'Angular'; }
