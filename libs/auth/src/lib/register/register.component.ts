import { Field, SimpleFormFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthFacade } from '../+state/auth.facade';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Username',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private simpleFormFacade: SimpleFormFacade, private facade: AuthFacade) {}

  ngOnInit() {
    this.simpleFormFacade.setStructure(structure);
    this.data$ = this.simpleFormFacade.data$;
    this.structure$ = this.simpleFormFacade.structure$;
  }

  updateForm(changes: any) {
    this.simpleFormFacade.updateData(changes);
  }

  submit() {
    this.facade.register();
  }

  ngOnDestroy() {
    this.simpleFormFacade.initializeForm();
  }
}
