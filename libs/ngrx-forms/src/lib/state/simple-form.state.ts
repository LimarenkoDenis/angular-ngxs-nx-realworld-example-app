import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SimpleForm } from '../interfaces/simple-form.interfaces';
import { SetData, UpdateData, SetStructure, SetErrors, InitializeErrors, InitializeForm, ResetForm } from './simple-form.actions';


const initialState = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false
}

@State<SimpleForm>({
  name: 'simpleForm',
  defaults: initialState
})
export class SimpleFormState {
  @Selector()
  static data(state: SimpleForm): any {
    return state.data;
  }

  @Selector()
  static structure(state: SimpleForm): any[] {
    return state.structure;
  }

  @Selector()
  static valid(state: SimpleForm): boolean {
    return state.valid;
  }

  @Selector()
  static errors(state: SimpleForm): boolean {
    return state.touched;
  }

  @Selector()
  static touched(state: SimpleForm): any {
    return state.errors;
  }

  @Action(SetData)
  setData({ patchState }: StateContext<SimpleForm>, {payload}: any) {
    patchState({ data: payload })
  }

  @Action(UpdateData)
  updateData({ patchState, getState }: StateContext<SimpleForm>, {payload}: any) {
    const data = { ...getState().data, ...payload };
    patchState({ touched: true, data })
  }

  @Action(SetStructure)
  setStructure({ patchState }: StateContext<SimpleForm>, {payload}: any) {
    patchState({ structure: payload })
  }


  @Action(SetErrors)
  setErrors({ patchState }: StateContext<SimpleForm>, {payload}: any) {
    patchState({ errors: payload })
  }

  @Action(InitializeErrors)
  initializeErrors({ patchState }: StateContext<SimpleForm>) {
    patchState({ errors: {} })
  }

  @Action(InitializeForm)
  initializeForm({ patchState }: StateContext<SimpleForm>) {
    patchState({ ...initialState })
  }

  @Action(ResetForm)
  resetForm({ patchState }: StateContext<SimpleForm>) {
    patchState({ touched: false })
  }

}

