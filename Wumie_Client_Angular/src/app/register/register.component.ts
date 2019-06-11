import {Component, OnInit} from '@angular/core';
import {DropdownValue} from "../entities/dropdownValue";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: any;

  showInfo = false;
  showError = false;
  messageError: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private registerSvc: RegisterService) {
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {

    let registerWrapper = {};
    registerWrapper['firstName'] = this.myForm.value.firstName;
    registerWrapper['lastName'] = this.myForm.value.lastName;
    registerWrapper['username'] = this.myForm.value.username;
    registerWrapper['email'] = this.myForm.value.email;
    registerWrapper['password'] = this.myForm.value.password;

    this.registerSvc.registerUser(registerWrapper)
      .subscribe(response => {
          this.showInfo = true;
          this.showError = false;
        },
        error => {
          this.showError = true;
          this.showInfo = false;
          this.messageError = error.error[Object.keys(error.error)[0]][0];
        }
      );
  }
}
