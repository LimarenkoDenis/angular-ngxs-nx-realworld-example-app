import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api/src/lib/types';
import { LoadArticle } from './article.actions';
import { Article } from '../+state/article.reducer';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleService } from '../article.service';
import { tap } from 'rxjs/operators';

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

  constructor(
    private articleService: ArticleService,

  ){}
}
