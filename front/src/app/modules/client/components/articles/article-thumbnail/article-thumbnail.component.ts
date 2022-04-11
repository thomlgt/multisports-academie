import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';

@Component({
  selector: 'app-article-thumbnail',
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.scss']
})
export class ArticleThumbnailComponent implements OnInit {

  @Input() article: Article;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToArticle() {
    this.router.navigateByUrl(`/articles/${this.article._id}`);
  }
}
