import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleThumbnailListComponent } from './article-thumbnail-list.component';

describe('ArticleThumbnailListComponent', () => {
  let component: ArticleThumbnailListComponent;
  let fixture: ComponentFixture<ArticleThumbnailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleThumbnailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleThumbnailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
