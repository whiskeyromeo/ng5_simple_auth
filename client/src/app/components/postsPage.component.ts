import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PostComponent } from './post.component';
import { MessagesComponent } from './messages.component';

@Component({
    selector: 'app-post-page',
    template: `
        <mat-card>
            <app-post></app-post>
            <app-messages
                (updateCurrentPost)="currentPostChange($event)">
            </app-messages>
        </mat-card>
    `
})
export class PostPageComponent {

    constructor() {}

}
