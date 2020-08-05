import { Component, OnInit } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../blogPost';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit 
{
  blogPosts: Array<BlogPost> = blogData;

  constructor() { }

  ngOnInit(): void {
  }
}