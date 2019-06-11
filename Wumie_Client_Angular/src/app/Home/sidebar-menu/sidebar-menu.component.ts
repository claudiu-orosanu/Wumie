import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SharedService} from "../../sharedService/shared.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarMenuComponent implements OnInit {

  userFirstName: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.userFirstName = this.sharedService.userFirstName;
  }

}
