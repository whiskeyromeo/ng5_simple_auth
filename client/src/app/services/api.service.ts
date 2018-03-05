import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';


@Injectable()
export class ApiService {
    path = 'http://localhost:3000';
    posts = [];
    post = {};
    users = [];
    constructor( private http: HttpClient) {}


    createPost(post) {
        this.http.post(`${this.path}/post`, post).subscribe(res => { });
        // Since we have posted and our current layout has the list of posts displayed
        // in the same page we pull down the new post.
        this.getPosts();
    }

    getPosts() {
        this.http.get<any>(`${this.path}/posts`).subscribe(res => {
            this.posts = res;
            console.log(res);
        });
    }

    getPost(postId) {
        this.http.get<any>(`${this.path}/post/:id`).subscribe(res => {
            this.post = res;
            console.log('apiService getPost: ', this.post);
        });
    }

    getProfile(userId) {
        return this.http.get(`${this.path}/profile/${userId}`);
    }

    getUsers() {
        this.http.get<any>(`${this.path}/users`).subscribe(res => {
            this.users = res;
        });
    }

    getUserPosts(userId) {
        return this.http.get<any>(`${this.path}/posts/${userId}`).subscribe(res => {
            this.posts = res;
        });
    }

    updatePost(post) {
        this.http.put(`${this.path}/post/${post._id}`, post).subscribe(res => { });
        this.getPosts();
    }

    deletePost(postId) {
        this.http.delete(`${this.path}/post/${postId}`).subscribe(res => { });
        this.getPosts();
    }

}
