import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {URL} from "../urlinterface/UrlInterface";
import {CrudService} from "../crud.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class RegisterService{

  constructor(private crudService: CrudService) {
  }

  registerUser(credentialsWrapper: any): Observable<any> {
    let url = URL + "/auth/signup";
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.crudService.saveObject(url, credentialsWrapper, headers);
  }

}
