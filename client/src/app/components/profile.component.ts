import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    template: `
        <mat-card>
            <mat-card-header>
                <h3>Profile</h3>
            </mat-card-header>
            <mat-card-content>
                <mat-list>
                    <mat-list-item> Name : {{profile?.name}}</mat-list-item>
                    <mat-list-item> Email : {{profile?.email}}</mat-list-item>
                    <mat-list-item> Description : {{profile?.description}}</mat-list-item>
                </mat-list>
            </mat-card-content>
        </mat-card>
        <app-messages></app-messages>
    `,
})
export class ProfileComponent {

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute
    ) { }

    profile;

    ngOnInit() {
        const id = this.route.snapshot.params.id;
        console.log(id);
        this.apiService.getProfile(id).subscribe(data => {
            this.profile = data;
        });
    }
}
