import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/modules/ms-api/article/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) {
    this.articleService
      .findAll()
      .subscribe(
        articles => {
          this.articles = articles;
          console.log(articles)
        },
        error => {
          console.warn(error);
          // TODO: log error
        }
      );
  }

  ngOnInit(): void {
  }

}
