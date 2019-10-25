import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { LoadArticle } from '../state/article.actions';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { ArticleState } from '../state/article.state';

@Injectable()
export class ArticleFacadeV2 {
  constructor(private store: Store) {}

  @Select(ArticleState.article)
  public article$: Observable<ArticleData>;

  @Select(ArticleState.loaded)
  public loaded$: Observable<boolean>;

  loadArticle(slug: string): any {
    this.store.dispatch(new LoadArticle(slug))
  }
}
