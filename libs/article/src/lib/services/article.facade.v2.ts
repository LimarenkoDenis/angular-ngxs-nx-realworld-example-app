import { LoadComments, DeleteArticleComment, AddComment } from './../state/article.actions';
import { ArticleData, ArticleComment } from '@angular-ngrx-nx-realworld-example-app/api';
import { LoadArticle } from '../state/article.actions';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


import { Store, Select } from '@ngxs/store';
import { ArticleState } from '../state/article.state';

@Injectable()
export class ArticleFacadeV2 {
  constructor(private store: Store) {}

  @Select(ArticleState.article)
  public article$: Observable<ArticleData>;

  @Select(ArticleState.comments)
  public comments$: Observable<ArticleComment[]>;

  @Select(ArticleState.loaded)
  public loaded$: Observable<boolean>;

  loadArticle(slug: string): any {
    this.store.dispatch(new LoadArticle(slug))
  }

  loadComments(slug: string): any {
    this.store.dispatch(new LoadComments(slug))
  }

  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(new DeleteArticleComment(data.commentId, data.slug));
  }

  submit(slug: string) {
    this.store.dispatch(new AddComment(slug));
  }

}
