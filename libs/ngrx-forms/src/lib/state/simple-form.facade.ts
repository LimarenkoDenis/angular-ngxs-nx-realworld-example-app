import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import { SetData, SetStructure, UpdateData, InitializeForm, InitializeErrors, ResetForm } from './simple-form.actions';
import { SimpleFormState } from './simple-form.state';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleFormFacade {

  @Select(SimpleFormState.data)
  public data$: Observable<any>;

  @Select(SimpleFormState.structure)
  public structure$: Observable<any[]>;

  @Select(SimpleFormState.errors)
  public errors$: Observable<any>;

  @Select(SimpleFormState.touched)
  public touched$: Observable<boolean>;

	public constructor(private store: Store) { }

	setStructure(structure: any) {
		this.store.dispatch(new SetStructure(structure));
	}

	setData(data: any) {
		this.store.dispatch(new SetData(data));
	}

	updateData(data: any) {
		this.store.dispatch(new UpdateData(data));
	}

	initializeForm() {
		this.store.dispatch(new InitializeForm());
	}

	initializeErrors() {
		this.store.dispatch(new InitializeErrors());
	}

	resetForm() {
		this.store.dispatch(new ResetForm());
	}
}
