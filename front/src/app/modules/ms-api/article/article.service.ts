import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  //* GET
  /**
   * renvoi toutes les actualités en base
   */
  findAll() {
    return this.http
      .get<Article[]>(
        `${environment.apiUrl}/articles`
      );
  }

  findById(id) {
    return this.http
      .get<Article>(
        `${environment.apiUrl}/articles/${id}`
      );
  }

  /**
   * Récupère les x dernières actualités en base classées dans l'ordre chronologique
   * @param take nombre d'actu à récupérer (défaut 3)
   * @param sort ordre chronologique à respecter (défaut 'desc' = antéchronologique)
   */
  findLastArticlesByDate(take: number = 3, sort: 'asc'|'desc' = 'desc') {
    return this.http
      .get<Article[]>(
        `${environment.apiUrl}/articles/Last?take=${take}&sort=${sort}`
      );
  }
}
