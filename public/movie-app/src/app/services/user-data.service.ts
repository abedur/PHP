import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';
import { User } from '../register/register.component';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private baseUrl: string = environment.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  public registerUser(userData: User): Observable<User> {
    const url: string = this.baseUrl + 'users/register';
    return this.http.post<User>(url, userData);
  }

  public login(userData: any): Observable<any> {
    const url: string = this.baseUrl + 'users/login'
    return this.http.post<User>(url, userData);
  }
  //  public getUserById()
}
