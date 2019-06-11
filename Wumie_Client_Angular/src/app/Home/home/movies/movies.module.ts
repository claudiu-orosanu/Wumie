import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PaginatorModule, TooltipModule} from "primeng/primeng";
import {DropdownModule} from "../../../smallcomponents/dropdown/dropdown.module";
import {RouterModule} from '@angular/router';
import {MoviesService} from "./movies.service";
import {MoviesComponent} from "./movies.component";
import {BsDatepickerModule} from "ngx-bootstrap";
import {SharedService} from "../../../sharedService/shared.service";

@NgModule({
  declarations: [
    MoviesComponent
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
    MoviesService,
    SharedService
  ]
})
export class MoviesModule {
}

