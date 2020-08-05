import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit 
{
  posts: Array<BlogPost>;

  constructor(private postService: PostService) { }

  ngOnInit()
  {
    this.postService.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0,3));
  }
}