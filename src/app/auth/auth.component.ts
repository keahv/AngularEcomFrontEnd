import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user';
import { catchError, debounceTime, map, Observable, of } from 'rxjs';

//custom validator to check special character
function mustContainsSpecialChar(control: AbstractControl) {
  if (
    control.value.includes('?') ||
    control.value.includes('@') ||
    control.value.includes('*') ||
    control.value.includes('!') ||
    control.value.includes('$') ||
    control.value.includes('#') ||
    control.value.includes('%') ||
    control.value.includes('^') ||
    control.value.includes('&')
  ) {
    return null;
  }

  return { doesNotContainSpecialChar: true };
}

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  private authService = inject(AuthServiceService);

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  authForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    isActive: new FormControl(true),
  });

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    const nameControl = this.authForm.get('userName');
    const emailControl = this.authForm.get('userEmail');
    const passwordControl = this.authForm.get('password');
    if (this.isLoginMode) {
      nameControl?.clearValidators();
      emailControl?.clearAsyncValidators();
      passwordControl?.clearValidators();
    } else {
      nameControl?.setValidators([Validators.required]);
      emailControl?.setAsyncValidators([this.asyncEmailValidator()]);
      passwordControl?.setValidators([
        Validators.required,
        Validators.minLength(6),
        mustContainsSpecialChar,
      ]);
    }

    // Update the validity after adding/removing validators
    nameControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
    passwordControl?.updateValueAndValidity();
  }

  onSubmit() {
    const formData = this.authForm.value;
    console.log(formData);

    if (this.isLoginMode) {
    const subscribe =  this.authService.login(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.localStorageService.setItem('userData', response.data);
            this.localStorageService.setItem('userId', response.data.id);
            console.log('Login successful:', response);
            this.authService.isLogin.set(true);
            this.authService.accessRole.set(response.data.accessRole);
            alert('login Successful');
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Wrong Credentials');
        },
      });
    } else {
      this.authService.signUp(formData).subscribe({
        next: (response) => {
          console.log('Sign-Up successful:', response);
          this.localStorageService.setItem('userData', response);
          this.localStorageService.setItem('userId', response.id);
          const user = this.localStorageService.getItem('userData');
          this.authService.isLogin.set(true);
          console.log(user);
          alert('Sign Up Successful');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Sign-Up error:', err);
          alert('Somthing went wrong');
        },
      });
    }
  }

  asyncEmailValidator(): AsyncValidatorFn {
    return (control: any): Observable<{ [key: string]: boolean } | null> => {
      return this.authService.validateEmail(control.value).pipe(
        debounceTime(5000),
        map((resp: any) => {
          if (!resp.data) {
            return { emailAlreadyExist: true };
          }
          return null;
        })
      );
    };
  }
  
}
