import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../services/user-data.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
export class User {
  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;

  set name(name: string) { this.#name = name; }
  set username(username: string) { this.#username = username; }
  set password(password: string) { this.#password = password; }

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  get username() { return this.#username; }
  get password() { return this.#password; }

  constructor(id: string, name: string, username: string, password: string) {
    this.#_id = id;
    this.#name = name;
    this.#username = username;
    this.#password = password;
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')
  registerForm!: NgForm;

  user!: User;
  errorMessage: string = "";

  constructor(private usersService: UserDataService, private router: Router) {
    this.user = new User("", "", "", "");
  }

  ngOnInit(): void {

  }


  submitForm(registerForm: NgForm) {
    this.usersService.registerUser(registerForm.value).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.errorMessage = environment.MSG_REGISTER_FAIL + ":" + err.statusText;
      }
    });
  }
}
