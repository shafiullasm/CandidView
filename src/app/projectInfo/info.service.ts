import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Info } from './info';

@Injectable()
export class InfoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl = 'http://localhost:64565/Api/Values';  // URL to web api

  constructor(private http: Http) { }

   getProjectDetails() {
    return this.http.get(this.apiUrl).map(this.success).catch(this.handleError);
   }

  handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }

  success(res: any) {
    return res.json() as Info[];
  }
}

