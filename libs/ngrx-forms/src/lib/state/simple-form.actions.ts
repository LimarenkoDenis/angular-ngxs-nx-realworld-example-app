import { Errors } from '../interfaces/simple-form.interfaces';

export class SetData {
  static type = '[simple form] SET_DATA';
  constructor(public payload: any) {}
}

export class UpdateData {
  static type = '[simple form] UPDATE_DATA';
  constructor(public payload: string) {}
}

export class SetStructure {
  static type = '[simple form] SET_STRUCTURE';
  constructor(public payload: string) {}
}

export class SetErrors {
  static type = '[simple form] SET_ERRORS';
  constructor(public payload: Errors) {}
}

export class InitializeErrors {
  static type = '[simple form] INITIALIZE_ERRORS';
}

export class InitializeForm {
  static type = '[simple form] INITIALIZE_FORM';
}

export class ResetForm {
  static type = '[simple form] RESET_FORM';
}
