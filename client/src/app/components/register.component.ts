import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: 'templates/register.component.html'
})
export class RegisterComponent {
    registerData = {};

    constructor(private authService: AuthService) {}

    post() {
        console.log(this.registerData);
        this.authService.registerUser(this.registerData);
    }

}
