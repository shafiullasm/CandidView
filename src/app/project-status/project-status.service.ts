import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { IProjectStatus } from './project-status';

@Injectable()
export class ProjectStatusService {

  // private headers = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl = 'http://localhost:3090/api/projectinfo/GetProjectInfo';  // URL to web api

  constructor(private http: Http) { }

  getProjectDetails() {
    let baseRequestOptions = new BaseRequestOptions();
    let options = baseRequestOptions.merge({
      url: this.apiUrl,
      withCredentials: true
    });

    return this.http.get(this.apiUrl, options).map(this.success).catch(this.handleError);
  }

  handleError(error: any) {
     // console.error('An error occurred', error); // for demo purposes only
    error = 'oops something went wrong please contact your administrator';
    return Observable.throw(error.message || error);
  }

  success(res: any) {
    return res.json() as IProjectStatus[];
  }


}

