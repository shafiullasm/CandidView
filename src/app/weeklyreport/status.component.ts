import { Component } from '@angular/core';
@Component({
  selector: 'weekly-info',
  templateUrl: './status.html'
})

export class Statuscomponent {
  currentDate: string = Date();
  constructor() { }
}


