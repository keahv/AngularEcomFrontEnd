import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
   public authService = inject(AuthServiceService);

  static emailIsUnique(control: AbstractControl,authService:AuthServiceService){
    emailAllowed(control.value,authService)
  }
}

function emailAllowed(email: string,service:AuthServiceService) {
  return service.validateEmail(email).subscribe()
}
