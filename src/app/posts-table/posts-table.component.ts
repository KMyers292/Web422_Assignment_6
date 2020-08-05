import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { BlogPost } from '../blogPost';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit 
{
  blogPosts: Array<BlogPost> = [];
  @Output() clickedPost = new EventEmitter();

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit()
  {
    this.postService.getAllPosts().subscribe(data => this.blogPosts = data);
  }

  rowClicked(e, id)
  {
    this.clickedPost.emit(this.router.navigate(['/admin/post', id])); 
  }
}