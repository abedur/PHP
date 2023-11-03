import { Component } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private authService: AuthDataService) { }
  get name() { return this.authService.name }


}
