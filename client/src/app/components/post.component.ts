import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { PostService } from '../services/post.service';
import { Post } from '../types/Post';


@Component({
    selector: 'app-post',
    templateUrl: './templates/post.component.html'
})

export class PostComponent implements OnInit {
    postForm: FormGroup;
    currentPost: Post;

    constructor(
        private apiService: ApiService,
        private postService: PostService,
        private route: ActivatedRoute, 
        private fb: FormBuilder,

    ) { }

    ngOnInit() {
        this.createForm();
        this.postService.currentPost.subscribe((post: Post) => {
            this.currentPost = post;
            this.postForm.setValue({title: post.title, content: post.content});
        });

        this.postForm.valueChanges.subscribe((value) => {
            console.log('post form value: ', value);
            console.log('currentPost value: ', this.postForm.controls['title'].value);
        });

    }


    

    createForm() {
        this.currentPost = { title: '', content: '' };
        this.postForm = this.fb.group({
            title: [this.currentPost.title, Validators.required],
            content: this.currentPost.content
        });
        
    }

    onEdit() {
        this.currentPost.title = this.postForm.controls['title'].value;
        this.currentPost.content = this.postForm.controls['content'].value;
        this.currentPost.updatedAt = Date.now();
        this.apiService.updatePost(this.currentPost);
        this.reset();
    }

    onSubmit() {
        this.apiService.createPost(this.postForm.value);
        this.reset();
    }

    reset() {
        this.currentPost = { title: '', content: ''};
        this.postForm.reset();
    }
    

}
