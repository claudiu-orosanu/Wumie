import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {routing} from "./app.routing-module";
import {AuthGuard} from "./AuthentificationGuard/auth.guard";
import {LoginService} from "./login/login.service";
import {DropdownModule} from "./smallcomponents/dropdown/dropdown.module";
import {RegisterComponent} from './register/register.component';
import {CrudService} from "./crud.service";
import {RegisterService} from "./register/register.service";
import {HomeModule} from "./Home/home/home.module";
import {SharedService} from "./sharedService/shared.service";
import {BsDatepickerModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    DropdownModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [AuthGuard, LoginService, CrudService, RegisterService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
