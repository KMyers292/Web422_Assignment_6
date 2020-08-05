import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../blogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit 
{
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
    this.querySub = this.activatedRoute.params.subscribe(params =>{
      this.postService.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        ++this.post.views;
        this.postService.updatePostById(this.post._id, this.post).subscribe();
        });
      });
  }

  submitComment()
  {
    let comment = {author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString()};

    this.post.comments.push(comment);

    this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentText = "";
      this.commentName = "";
    });
  }

  ngOnDestroy()
  {
    if(this.querySub) this.querySub.unsubscribe();
  }
}