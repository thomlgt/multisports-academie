import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/modules/ms-api/article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveLastArticles();
  }

  //* News section
  retrieveLastArticles() {
    this.articleService
      .findLastArticlesByDate()
      .subscribe(
        articles => {
          console.log(articles);
          this.articles = articles;
        },
        error => {
          console.warn(error);
        });
  }

  goToArticles() {
    this.router.navigateByUrl("/articles");
  }

}
