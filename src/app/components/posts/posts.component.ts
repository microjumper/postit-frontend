import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  display: boolean;

  post: Post;
  posts$: Observable<Post[]> | undefined;

  constructor(private postService: PostService) {
    this.display = false;

    this.post = {
      title: '',
      content: ''
    };
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  showDialog(): void {
    this.display = true;
  }

  addPost(): void {
    this.display = false;

    this.postService.postNew(this.post).subscribe(
      response => {
        this.posts$ = this.postService.getPosts();
        this.resetPost();
      }
    );
  }

  cancel(): void {
    this.display = false;

    this.resetPost();
  }

  private resetPost(): void {
    this.post = {
      title: '',
      content: ''
    };
  }
}
