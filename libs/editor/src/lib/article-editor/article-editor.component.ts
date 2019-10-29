import { Field, SimpleFormFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { EditorFacade } from '../+state/editor.facade';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'title',
    placeholder: 'Article Title',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'description',
    placeholder: "What's this article about?",
    validator: [Validators.required]
  },
  {
    type: 'TEXTAREA',
    name: 'body',
    placeholder: 'Write your article (in markdown)',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'tagList',
    placeholder: 'Enter Tags',
    validator: []
  }
];

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private simpleFormFacade: SimpleFormFacade, private router: Router, private facade: EditorFacade) {}

  ngOnInit() {
    this.simpleFormFacade.setStructure(structure);
    this.data$ = this.simpleFormFacade.data$;
    this.structure$ = this.simpleFormFacade.structure$;
    this.facade.article$.subscribe(article => this.simpleFormFacade.setData(article));
  }

  updateForm(changes: any) {
    this.simpleFormFacade.updateData(changes);
  }

  submit() {
    this.facade.publishArticle();
  }

  ngOnDestroy() {
    this.simpleFormFacade.initializeForm();
    this.facade.initializeArticle();
  }
}
