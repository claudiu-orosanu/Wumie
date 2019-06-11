import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/throw';

@Injectable()
export class CrudService {
  constructor(public http: HttpClient) {
  }

  getObject(url: string, headers?: HttpHeaders): Observable<any> {

    return this.http.get(url, {headers: headers}).catch(this.handleError);
  }

  protected getForkJoin(url1: string, url2: string): Observable<any> {
    return Observable.forkJoin(this.getObject(url1), this.getObject(url2));
  }

  protected getForkJoinThree(url1: string, url2: string, url3: string): Observable<any> {
    return Observable.forkJoin(this.getObject(url1), this.getObject(url2), this.getObject(url3));
  }

  saveObject(url: string, object: any, headers?: HttpHeaders): Observable<any> {

    return this.http.post(url, object, {headers: headers})
      .catch(this.handleError);
  }

  putObject(url: string, object: any, headers?: HttpHeaders): Observable<any> {

    return this.http.put(url, object, {headers: headers})
      .catch(this.handleError);
  }

  protected handleError(error: HttpErrorResponse | any) {
    return Observable.throw(error);
  }

  deleteObject(url: string, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(url, {headers: headers}).catch(this.handleError);
  }

}
