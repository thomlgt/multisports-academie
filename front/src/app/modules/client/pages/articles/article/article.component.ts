import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/modules/ms-api/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  private routeSub: Subscription;
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.retrieveArticle(params.id);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  goToArticles() {
    this.router.navigateByUrl("/articles");
  }

  retrieveArticle(id: any) {
    this.articleService.findById(id).subscribe(
      result => {
        this.article = result;
        console.log(result);
      }, error => {
        console.warn(error);
      }
    );
  }
}
