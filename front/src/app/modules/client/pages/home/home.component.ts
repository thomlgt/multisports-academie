import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/modules/ms-api/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from 'src/app/modules/ms-api/picture/picture.service';
import { Picture } from 'src/app/models/picture/picture.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[];
  pictures: Picture[];

  constructor(
    private articleService: ArticleService,
    private pictureService: PictureService,
    private router: Router,
    private scroller: ViewportScroller,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(frag => {
      this.scroller.scrollToAnchor(frag);
    });

    this.retrieveLastArticles();
    this.retrievePictures();
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
  

  //* Gallery section
  retrievePictures() {
    this.pictureService.findAll().subscribe(
      result => {
        this.pictures = result;
      },
      err => {
        console.warn(err.message);
      }
    );
  }
}
