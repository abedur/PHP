import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  #isLoggedIn: boolean = false;
  #name: string = "";
  #token: string = "";

  constructor(private jwt: JwtHelperService) { }


  get name() { return this.#name; }
  get token() { return this.#token; }

  get isLoggedIn() {
    if (localStorage.getItem(environment.AUTH_TOKEN_KEY)) {
      const token = localStorage.getItem(environment.AUTH_TOKEN_KEY);
      if (token) {
        const name = this.jwt.decodeToken(token).name as string;
        this.#name = name;
        this.#isLoggedIn = true;
      }
    }
    return this.#isLoggedIn;
  }
  login(token: string) {
    localStorage.setItem(environment.AUTH_TOKEN_KEY, token);
    const name = this.jwt.decodeToken(token).name as string;
    this.#name = name;
    this.#isLoggedIn = true;
    console.log(">>Login Ends<<");

  }

  logout() {
    localStorage.clear();
    this.#name = "";
    this.#isLoggedIn = false;
  }

}
