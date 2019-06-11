import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpHeaders} from "@angular/common/http";
import {URL} from "../urlinterface/UrlInterface";
import {CrudService} from "../crud.service";
import {Router} from '@angular/router';


@Injectable()
export class LoginService {

  constructor(private crudService: CrudService,
              private router: Router) {
  }

  login(credentials: any): Observable<any> {
    let url = URL + "/auth/login";
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.crudService.saveObject(url, credentials, headers);
  }

  logout() {

    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
