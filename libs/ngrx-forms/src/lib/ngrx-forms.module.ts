import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { SimpleFormFacade } from './state/simple-form.facade';
import { SimpleFormState } from './state/simple-form.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SimpleFormState]),
  ],
  providers: [SimpleFormFacade],
  declarations: [DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, ListErrorsComponent],
  entryComponents: [InputComponent, TextareaComponent],
  exports: [DynamicFormComponent, ListErrorsComponent]
})
export class NgrxFormsModule {}
