import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  blogPosts: Array<BlogPost>;

  constructor(private postService: PostService) { }

  ngOnInit() 
  {
    this.postService.getPosts(1, null, null).subscribe(data => this.blogPosts = data);
  }
}