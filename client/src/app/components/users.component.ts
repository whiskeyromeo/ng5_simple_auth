import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
    selector: 'app-users',
    template: `
        <div>
            <h3>Users</h3>
            <div *ngFor="let user of apiService.users">
            <mat-card [routerLink]="['/profile', user._id]" style="cursor: pointer;">{{user.name}}</mat-card>
            </div>
        </div>
    `
})
export class UsersComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getUsers();
    }
}
