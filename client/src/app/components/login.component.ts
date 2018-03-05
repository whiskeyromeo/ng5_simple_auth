import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    template: `
        <mat-card>
            <mat-card-header>
                <mat-card-title>
                    <h4>Login</h4>
                </mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <form class="login">
                    <mat-input-container>
                        <input matInput [(ngModel)]="loginData.email" name="email" type="email" placeholder="email">
                    </mat-input-container>
                    <mat-input-container>
                        <input matInput [(ngModel)]="loginData.passwd" name="password" type="password" placeholder="password">
                    </mat-input-container>
                    <button (click)="post()" mat-raised-button color="primary">Login</button>
                </form>
            </mat-card-content>
        </mat-card>
        `
})
export class LoginComponent {
    loginData = {};

    constructor(
        private authService: AuthService
    ) { }

    post() {
        console.log(this.loginData);
        this.authService.loginUser(this.loginData);
    }

}
