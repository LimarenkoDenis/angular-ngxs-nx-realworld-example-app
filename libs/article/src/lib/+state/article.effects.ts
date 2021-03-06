import { ArticleFacadeV2 } from './../services/article.facade.v2';
import { ArticleService } from '../article.service';
import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators'
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import * as ArticleActions from './article.actions';

import {
  ResetForm,
  SetErrors,
  SimpleFormFacade
} from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';

@Injectable()
export class ArticleEffects {
  loadArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      concatMap(action =>
        this.articleService.get(action.slug).pipe(
          map(results =>
            ArticleActions.loadArticleSuccess({ article: results })
          ),
          catchError(error => of(ArticleActions.loadArticleFail(error)))
        )
      )
    )
  );

  loadComments = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadComments),
      concatMap(action =>
        this.articleService.getComments(action.slug).pipe(
          map(comments => ArticleActions.loadCommentsSuccess({ comments })),
          catchError(error => of(ArticleActions.loadCommentsFail(error)))
        )
      )
    )
  );

  deleteArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap(action =>
        this.articleService.deleteArticle(action.slug).pipe(
          map(_ => ({ type: '[router] Go', payload: { path: ['/'] } })),
          catchError(error => of(ArticleActions.deleteArticleFail(error)))
        )
      )
    )
  );


  // deprecated
  // addComment = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ArticleActions.addComment),
  //     map(action => action.slug),
  //     withLatestFrom(
  //       this.simpleFormFacade.data$,
  //       this.simpleFormFacade.structure$
  //     ),
  //     exhaustMap(([slug, data, structure]) =>
  //       this.articleService.addComment(slug, data.comment).pipe(
  //         mergeMap(comment => [
  //           ArticleActions.addCommentSuccess({ comment }),
  //           new ResetForm()
  //         ]),
  //         tap(() => this.articleFacadeV2.loadComments(slug)),
  //         catchError(result => of(new SetErrors(result.error.errors)))
  //       )
  //     )
  //   )
  // );

  deleteComment = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteComment),
      concatMap(action =>
        this.articleService.deleteComment(action.commentId, action.slug).pipe(
          map(_ =>
            ArticleActions.deleteCommentSuccess({ commentId: action.commentId })
          ),
          catchError(error => of(ArticleActions.deleteCommentFail(error)))
        )
      )
    )
  );

  follow = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.follow),
      map(action => action.username),
      concatMap(username =>
        this.actionsService.followUser(username).pipe(
          map(profile => ArticleActions.followSuccess({ profile })),
          catchError(error => of(ArticleActions.followFail(error)))
        )
      )
    )
  );

  unFollow = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.unFollow),
      map(action => action.username),
      concatMap(username =>
        this.actionsService.unfollowUser(username).pipe(
          map(profile => ArticleActions.unFollowSuccess({ profile })),
          catchError(error => of(ArticleActions.unFollowFail(error)))
        )
      )
    )
  );

  favorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.favorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.favorite(slug).pipe(
          map(article => ArticleActions.favoriteSuccess({ article })),
          catchError(error => of(ArticleActions.favoriteFail(error)))
        )
      )
    )
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.unFavorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.unfavorite(slug).pipe(
          map(article => ArticleActions.unFavoriteSuccess({ article })),
          catchError(error => of(ArticleActions.unFavoriteFail(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private actionsService: ActionsService,
    private articleFacadeV2: ArticleFacadeV2,
    private simpleFormFacade: SimpleFormFacade,
  ) {}
}
