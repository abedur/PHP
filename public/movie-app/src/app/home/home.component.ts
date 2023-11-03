import { Component } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthDataService) { }
  get isLoggedIn() { return this.authService.isLoggedIn; }
  get name() { return this.authService.name }


}
