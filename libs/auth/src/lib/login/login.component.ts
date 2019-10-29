import { Field, SimpleFormFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthFacade } from '../+state/auth.facade';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Username',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password'
    }
  }
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(
    private facade: AuthFacade,
    private simpleFormFacade: SimpleFormFacade
    ) {}

  ngOnInit() {
    this.simpleFormFacade.setStructure(structure);
    this.data$ = this.simpleFormFacade.data$;
    this.structure$ = this.simpleFormFacade.structure$;
  }

  updateForm(changes: any) {
    this.simpleFormFacade.updateData(changes);
  }

  submit() {
    this.facade.login();
  }

  ngOnDestroy() {
    this.simpleFormFacade.initializeForm();
  }
}
