import {Injectable} from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable()
export class SharedService {

  public userRole: string;
  public userFirstName: string;
  public userLastName: string;


  constructor () {
    let token = localStorage.getItem('token');
    let userInfo = this.getInfoFromToken(token);
    this.userRole = userInfo[0];
    this.userFirstName = userInfo[1];
    this.userLastName = userInfo[2];
  }

  getInfoFromToken(token): string[]{
    if(token) {
      let tok: any;
      tok = JWT(token);
      return [tok.rol, tok.fnm, tok.lnm, tok.exp];
    }

    return [''];
  }

}
