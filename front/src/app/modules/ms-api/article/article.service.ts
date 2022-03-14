import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Article[]>(`${environment.apiUrl}/articles`);
  }
}
