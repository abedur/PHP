import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../services/user-data.service';
import { AuthDataService } from '../services/auth-data.service';
import { environment } from 'src/environments/environment';

export class Token {
  #token!: string;
  get token() { return this.#token }
  set token(token: string) { this.#token = token }
  constructor(token: string) { this.#token = token }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserDataService,
    private authService: AuthDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  submitForm(): void {
    // console.log("Form Called");
    // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      //      console.log('Form data:', this.loginForm.value);
      this.userService.login(this.loginForm.value).subscribe({

        next: (tokenResponse) => {
          this.authService.login(tokenResponse.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = environment.MSG_LOGIN_FAIL;
        }
      });
    }
  }
}
