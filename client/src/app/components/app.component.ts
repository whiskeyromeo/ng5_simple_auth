import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.component.html',
  styleUrls: ['./stylesheets/app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  
}
