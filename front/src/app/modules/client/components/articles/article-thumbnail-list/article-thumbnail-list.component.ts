import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';

@Component({
  selector: 'app-article-thumbnail-list',
  templateUrl: './article-thumbnail-list.component.html',
  styleUrls: ['./article-thumbnail-list.component.scss']
})
export class ArticleThumbnailListComponent implements OnInit {

  @Input() articles: Article[];

  constructor() { }

  ngOnInit(): void {
  }

 

}
