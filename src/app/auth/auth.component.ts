import { CommonModule } from '@angular/common';
import { Component, inject ,DestroyRef} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { debounceTime, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TokenStorageService } from '../services/token-storage.service';

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
  imports: [ReactiveFormsModule, CommonModule, RouterModule,ToastModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers:[MessageService],
})
export class AuthComponent {
  isLoginMode = true;
  private authService = inject(AuthServiceService);
  private destroyRef = inject(DestroyRef);
  private msgService = inject(MessageService);

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private tokenStorage: TokenStorageService
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
            // this.localStorageService.setItem('userData', response.data);
            this.localStorageService.setItem('userId', response.data.id);
            console.log('Login successful:', response);
            this.authService.isLogin.set(true);
            this.authService.accessRole.set(response.data.accessRole);
            this.tokenStorage.saveToken(response.data);
            this.authService.authToken.set(response.token);
            // this.tokenStorage.saveUser(data);
            // alert('login Successful');
            this.router.navigate(['/']);
          }else {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Wrong Credentials' });
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Oops, something went wrong' });
        },
      });

     this.destroyRef.onDestroy(()=>{
      subscribe.unsubscribe();
     });
    } else {
      const subscribe = this.authService.signUp(formData).subscribe({
        next: (response) => {
          console.log('Sign-Up successful:', response);
          this.localStorageService.setItem('userData', response.data);
          this.localStorageService.setItem('userId', response.data.id);
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
      this.destroyRef.onDestroy(()=>{
        subscribe.unsubscribe();
       })
    }
  }

  //async validator for unique email
  asyncEmailValidator(): AsyncValidatorFn {
    return (control: any): Observable<{ [key: string]: boolean } | null> => {
      return this.authService.validateEmail(control.value).pipe(
        debounceTime(500),
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
