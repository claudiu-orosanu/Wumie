import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {HeaderComponent} from "../header/header.component";
import {SidebarMenuComponent} from "../sidebar-menu/sidebar-menu.component";
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../../AuthenticationGuard/auth.guard";
import {CrudService} from "../../crud.service";
import {HomeRoutes} from "./home-routing.module";
import {TokenInterceptor} from "./AuthenticationInterceptor/tokenInterceptor.service";
import {MoviesModule} from "./movies/movies.module";
import {BsDatepickerModule} from "ngx-bootstrap";
import {PaginatorModule} from "primeng/primeng";
import {ActorsModule} from "./actors/actors.module";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeRoutes,
    MoviesModule,
    ActorsModule,
    BsDatepickerModule.forRoot(),
    PaginatorModule
  ],
  providers: [
    AuthGuard,
    CrudService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})

export class HomeModule {
}

