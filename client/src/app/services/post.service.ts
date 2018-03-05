import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PostService {
    path = 'http://localhost:3000';
    post = {};

    private postSource = new BehaviorSubject<object>({title: '', content: ''});
    currentPost = this.postSource.asObservable();

    constructor(private http: HttpClient) { }

    updateCurrentPost(post: object) {
        this.postSource.next(post);
    }



}
