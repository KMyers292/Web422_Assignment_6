import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../blogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit 
{
  blogPost: BlogPost;
  tags: string;
  @Output() delete = new EventEmitter();

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
    let id = this.activatedRoute.snapshot.params['id'];

    this.postService.getPostbyId(id).subscribe(data => this.blogPost = data);
    this.postService.getPostbyId(id).subscribe(data => this.tags = data.tags.toString());
  }

  formSubmit()
  {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());

    this.postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  deletePost()
  {
    this.delete.emit(this.postService.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate(['/admin']);
    }));
  }
}