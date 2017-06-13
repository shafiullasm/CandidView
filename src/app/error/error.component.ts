import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'candid-error',
  templateUrl: './error.html'
})
export class ErrorComponent { 
     @Input() isServiceError:string;
}