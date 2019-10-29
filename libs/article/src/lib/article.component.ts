import { ArticleFacadeV2 } from './services/article.facade.v2';
import { ArticleComment, ArticleData, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { combineLatest, filter, takeUntil } from 'rxjs/operators';

import { ArticleFacade } from './+state/article.facade';
import { SimpleFormFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';

const structure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Write a comment...',
    attrs: {
      rows: 3
    }
  }
];

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Observable<ArticleData>;
  comments$: Observable<ArticleComment[]>;
  canModify = false;
  isAuthenticated$: Observable<boolean>;
  structure$: Observable<Field[]>;
  data$: Observable<any>;
  unsubscribe$ = new Subject<void>();
  currentUser$: Observable<User>;
  touchedForm$: Observable<boolean>;

  constructor(
    private facade: ArticleFacade,
    private auhtFacade: AuthFacade,
    private articleFacadeV2: ArticleFacadeV2,
    private simpleFormFacade: SimpleFormFacade,
  ) {}

  ngOnInit() {
    this.article$ = this.articleFacadeV2.article$;
    this.comments$ = this.articleFacadeV2.comments$;

    this.isAuthenticated$ = this.auhtFacade.isLoggedIn$;
    this.currentUser$ = this.auhtFacade.user$;

    this.data$ = this.simpleFormFacade.data$;
    this.structure$ = this.simpleFormFacade.structure$;
    this.touchedForm$ = this.simpleFormFacade.touched$;

    this.simpleFormFacade.setStructure(structure);
    this.simpleFormFacade.setData('');
    this.auhtFacade.auht$
      .pipe(filter(auth => auth.loggedIn), combineLatest(this.facade.authorUsername$), takeUntil(this.unsubscribe$))
      .subscribe(([auth, username]) => {
        this.canModify = auth.user.username === username;
      });
  }

  follow(username: string) {
    this.facade.follow(username);
  }
  unfollow(username: string) {
    this.facade.unfollow(username);
  }
  favorite(slug: string) {
    this.facade.favorite(slug);
  }
  unfavorite(slug: string) {
    this.facade.unfavorite(slug);
  }
  delete(slug: string) {
    this.facade.delete(slug);
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.articleFacadeV2.deleteComment(data);
  }
  submit(slug: string) {
    this.articleFacadeV2.submit(slug);
  }
  updateForm(changes: any) {
    this.simpleFormFacade.updateData(changes);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.facade.initializeArticle();
  }
}
