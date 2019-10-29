import { ArticleData, ArticleComment } from '@angular-ngrx-nx-realworld-example-app/api';
import { LoadArticle, LoadComments, DeleteArticleComment, AddComment } from './article.actions';
import { Article } from '../+state/article.reducer';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleService } from '../article.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { SimpleFormFacade, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { of } from 'rxjs';

@State<Article>({
  name: 'article',
  defaults: {
    data: {
      slug: '',
      title: '',
      description: '',
      body: '',
      tagList: [],
      createdAt: '',
      updatedAt: '',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: '',
        bio: '',
        image: '',
        following: false,
        loading: false
      }
    },
    comments: [],
    loaded: false,
    loading: false
  }
})
export class ArticleState {

  @Selector()
  static article(state: Article): ArticleData {
    return state.data;
  }

  @Selector()
  static comments(state: Article): ArticleComment[] {
    return state.comments;
  }

  @Selector()
  static loaded(state: Article): boolean {
    return state.loaded;
  }

  @Action(LoadArticle)
  loadArticle({ patchState }: StateContext<Article>, { slug }: LoadArticle) {
    return this.articleService.get(slug).pipe(
      tap((data: ArticleData) => {
        patchState({ data, loaded: true, loading: false });
      })
    );
  }

  @Action(LoadComments)
  loadComments({ patchState }: StateContext<Article>, { slug }: LoadArticle) {
    return this.articleService.getComments(slug).pipe(
      tap((comments: ArticleComment[]) => {
        patchState({ comments });
      })
    );
  }

  @Action(AddComment)
  addCommentToArticle({ patchState, getState }: StateContext<Article>, { slug }: AddComment) {
    // TODO: research https://www.ngxs.io/concepts/select#meta-selectors

    return this.simpleFormFacade.data$.pipe(
      switchMap((data: any) => this.articleService.addComment(slug, data.comment).pipe(
        tap((comment: ArticleComment) => {
          const comments: ArticleComment[] = getState().comments
          patchState({ comments: [...comments, comment] });
        }),
        tap(() => this.simpleFormFacade.resetForm()),
        catchError(result => of(new SetErrors(result.error.errors)))
      ))
    )
  }

  @Action(DeleteArticleComment)
  deleteArticleComment({ patchState, getState }: StateContext<Article>, { commentId, slug }: DeleteArticleComment) {
    return this.articleService.deleteComment(commentId, slug).pipe(
      tap(() => {
        const comments = getState().comments.filter((comment) => comment.id !== commentId);
        patchState({ comments });
      })
    );
  }

  constructor(
    private articleService: ArticleService,
    private simpleFormFacade: SimpleFormFacade
  ){}
}
