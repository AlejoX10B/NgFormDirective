import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export const ALPHABETIC_REGEX = new RegExp('^[a-záéíóúñü\\s]+$', 'i')
export const EMAIL_REGEX = new RegExp('^[\\w.-]+@[\\w.-]+\\.\\w+$');


export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    return (EMAIL_REGEX.test(control.value)) ? null : { email: true }
  }
}

export function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null

    return (ALPHABETIC_REGEX.test(control.value)) ? null : { alphabetic: true }
  }
}

export function markAllAsDirty(form: FormGroup) {
  Object.keys(form.controls).forEach((key) => {
    form.get(key)?.markAsDirty();
  });
}