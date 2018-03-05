import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';


@Component({
    selector: 'app-messages',
    templateUrl: './templates/messages.component.html',
    styleUrls: ['./stylesheets/messages.component.css']
})
export class MessagesComponent implements OnInit {
    @Output() updateCurrentPost = new EventEmitter();

    currentPost: object;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private postService: PostService
    ) { }

    ngOnInit() {
        const userId = this.route.snapshot.params.id;
        if (userId) {
            this.apiService.getUserPosts(userId);
        } else {
            this.apiService.getPosts();
        }

        this.postService.currentPost.subscribe(post => this.currentPost = post);

    }

    updatePost(post) {
        this.postService.updateCurrentPost(post);
        return false;
    }

    deletePost(post) {
        console.log('post from delete: ', post);
        this.apiService.deletePost(post._id);
        return false;
    }

}
