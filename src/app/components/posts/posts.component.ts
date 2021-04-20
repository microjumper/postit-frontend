import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {PostService} from '../../services/post/post.service';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]> | undefined;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}
