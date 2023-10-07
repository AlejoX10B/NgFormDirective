import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[errorChecker]',
})
export class ErrorCheckerDirective implements OnInit, OnDestroy {

  @Input() errorChecker!: AbstractControl | null;
  private errorElement!: HTMLElement | null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit() {    
    this.errorChecker?.statusChanges.subscribe((v) => {      
      this.updateErrorMessage();
    });

    this.formGroupDirective.ngSubmit.subscribe(() => {
      this.updateErrorMessage();
    });
  }

  ngOnDestroy() {
    if (this.errorElement) {
      this.errorElement.remove();
    }
  }

  private updateErrorMessage() {
    
    if (this.errorChecker?.invalid && (this.errorChecker?.dirty || this.errorChecker?.touched)) {

      let errMsg = ''; 
      const errors = this.errorChecker.errors;

      if (errors?.['required']) {
        errMsg = 'Este campo es obligatorio.';
      }
      else if (errors?.['minlength']) {
        errMsg = `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
      }
      else if (errors?.['maxlength']) {
        errMsg = `No debe tener más de ${errors['maxlength'].requiredLength} caracteres.`;
      }
      else if (errors?.['pattern']) {
        errMsg = 'Este campo no tiene un formato válido';
      }
      else if (errors?.['email']) {
        errMsg = 'El email no tiene un formato válido.'
      }
      else if (errors?.['alphabetic']) {
        errMsg = 'El campo solo permite caracteres alfabéticos.'
      }

      if (!this.errorElement) {
        this.errorElement = this.renderer.createElement('span');
        this.renderer.appendChild(this.elementRef.nativeElement.parentNode, this.errorElement);
      }

      this.errorElement!.textContent = errMsg;
      this.errorElement!.className = 'error-msg';
    }
    else {
      if (this.errorElement) {
        this.errorElement.remove();
        this.errorElement = null;
      }
    }
  }

}
