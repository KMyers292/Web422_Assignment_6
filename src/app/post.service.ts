import { Injectable } from '@angular/core';
import { BlogPost } from './blogPost';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const perPage: number = 6;
const MAX_INTEGER = Number.MAX_SAFE_INTEGER;

@Injectable({
  providedIn: 'root'
})
export class PostService 
{
  url: string = "https://sheltered-inlet-47778.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]>
  {
    if(!tag && !category)
    {
      return this.http.get<BlogPost[]>(this.url + `api/posts?page=${page}&perPage=${perPage}`);
    }
    else if(!tag)
    {
      return this.http.get<BlogPost[]>(this.url + `api/posts?page=${page}&perPage=${perPage}&category=${category}`);
    }
    else if(!category)
    {
      return this.http.get<BlogPost[]>(this.url + `api/posts?page=${page}&perPage=${perPage}&tag=${tag}`);
    }
    else
    {
      return this.http.get<BlogPost[]>(this.url + `api/posts?page=${page}&perPage=${perPage}&tag=${tag}&category=${category}`);
    }
  }

  getPostbyId(id): Observable<BlogPost>
  {
    return this.http.get<BlogPost>(this.url + `api/posts/${id}`);
  }

  getCategories(): Observable<any>
  {
    return this.http.get<any>(this.url + `api/categories`);
  }

  getTags(): Observable<string[]>
  {
    return this.http.get<string[]>(this.url + `api/tags`);
  }

  getAllPosts():Observable<BlogPost[]>
  {
    return this.http.get<BlogPost[]>(this.url + `api/posts?page=1&perPage=${MAX_INTEGER}`);
  }

  newPost(data: BlogPost): Observable<any>
  {
    return this.http.post<any>(this.url + `api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>
  {
    return this.http.put<any>(this.url + `api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>
  {
    return this.http.delete<any>(this.url + `api/posts/${id}`);
  }
}