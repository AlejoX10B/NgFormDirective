import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ErrorCheckerDirective } from './checker.directive';
import { alphabeticValidator, emailValidator, markAllAsDirty } from './validators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ErrorCheckerDirective
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FormDirective';

  form = new FormBuilder().group({
    name: [null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
      alphabeticValidator()
    ]],
    email: [null, [
      Validators.required,
      emailValidator()
    ]],
  });

  onSubmit() {
    if (this.form.invalid) {
      markAllAsDirty(this.form)

      window.alert('Wrong')
      return
    }

    window.alert('OK')
  }
  
}
