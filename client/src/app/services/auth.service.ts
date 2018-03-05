import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    messages = [];
    path = 'http://localhost:3000/auth';

    TOKEN_KEY = 'token';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    get token() {
        return this.getToken();
    }

    get isAuthenticated() {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    loginUser(loginData) {
        this.http.post<any>(`${this.path}/login`, loginData).subscribe(res => {
            this.saveToken(res.token);
        });
    }

    registerUser(registerData) {
        this.http.post<any>(`${this.path}/register`, registerData).subscribe(res => {
            this.saveToken(res.token);
        });
    }


    saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.router.navigate(['/users']);
    }

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

}
