import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {

    if (!localStorage.getItem('token')) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }


    // check if token has expired
    let tokenExpiryDate = +localStorage.getItem('tokenExpiresIn');

    let now = Math.round((new Date()).getTime() / 1000); // unix timestamp

    if(now - tokenExpiryDate > 0) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
