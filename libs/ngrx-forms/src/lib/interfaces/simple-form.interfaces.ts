import { ValidatorFn } from '@angular/forms';

export interface SimpleForm {
    data: any;
    structure: Field[];
    valid: boolean;
    errors: Errors;
    touched: boolean;
  }

  export interface SimpleFormState {
    readonly SimpleForm: SimpleForm;
  }

  export interface Field {
    type: FieldType;
    name: string;
    label?: string;
    placeholder?: string;
    validator?: ValidatorFn[];
    attrs?: any;
  }

  export type FieldType = 'INPUT' | 'TEXTAREA';

  export interface Errors {
    [key: string]: string;
  }
