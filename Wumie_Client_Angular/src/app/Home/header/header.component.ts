import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {SharedService} from "../../sharedService/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userFirstName: string;
  userLastName: string;

  constructor(public loginService: LoginService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.userFirstName = this.sharedService.userFirstName;
    this.userLastName = this.sharedService.userLastName;
  }

}
