import { Component } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  get isLoggedIn() { return this.authService.isLoggedIn; }

  constructor(private router: Router, private authService: AuthDataService) { }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
