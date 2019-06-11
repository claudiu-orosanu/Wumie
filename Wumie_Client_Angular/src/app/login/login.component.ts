import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {SharedService} from "../sharedService/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: any;
  showError: boolean;
  token: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginSvc: LoginService,
              private sharedService: SharedService) {
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    let credentials = {'usernameOrEmail': this.myForm.value.usernameOrEmail, 'password': this.myForm.value.password};
    this.loginSvc.login(credentials)
      .subscribe(response => {
          // save access tokem in localStorage
          this.token = response.accessToken;
          localStorage.setItem('token', this.token);
          localStorage.setItem('tokenCreatedAt', Math.round((new Date()).getTime() / 1000).toString());
          this.showError = false;

          let tokenInfo = this.sharedService.getInfoFromToken(this.token);
          this.sharedService.userRole = tokenInfo[0];
          this.sharedService.userFirstName = tokenInfo[1];
          this.sharedService.userLastName = tokenInfo[2];
          localStorage.setItem('tokenExpiresIn', tokenInfo[3]);

          this.router.navigate(['/home/movies']);
        },
        error => {
          console.log(error);
          this.showError = true;
        }
      );
  }

}
