import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/modules/ms-api/article/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private scroller: ViewportScroller,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(frag => {
      this.scroller.scrollToAnchor(frag);
    });

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
