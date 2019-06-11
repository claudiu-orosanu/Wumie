import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PaginatorModule, TooltipModule} from "primeng/primeng";
import {DropdownModule} from "../../../smallcomponents/dropdown/dropdown.module";
import {RouterModule} from '@angular/router';
import {BsDatepickerModule} from "ngx-bootstrap";
import {SharedService} from "../../../sharedService/shared.service";
import {ActorsComponent} from "./actors.component";
import {ActorsService} from "./actors.service";

@NgModule({
  declarations: [
    ActorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule,
    DropdownModule,
    PaginatorModule,
    RouterModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ActorsService,
    SharedService
  ]
})
export class ActorsModule {
}

