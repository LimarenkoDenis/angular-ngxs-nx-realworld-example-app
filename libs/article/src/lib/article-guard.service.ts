import { ArticleFacadeV2 } from './services/article.facade.v2';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, take, switchMap, tap } from 'rxjs/operators';
import { ArticleFacade } from './+state/article.facade';

@Injectable()
export class ArticleGuardService implements CanActivate {
  constructor(private facade: ArticleFacade, private articleFacadeV2: ArticleFacadeV2) {}

  waitForArticleToLoad(): Observable<boolean> {
    return this.articleFacadeV2.loaded$.pipe(filter(loaded => loaded), take(1));
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.articleFacadeV2.loadArticle(slug)

    return this.waitForArticleToLoad().pipe(tap(() => this.articleFacadeV2.loadComments(slug)));
  }
}
