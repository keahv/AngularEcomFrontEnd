import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    console.log(localStorageService.getItem<User>('userData')?.userId);
  }

  authForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    isActive: new FormControl(true),
  });

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.removeControl('userName');
    } else {
      this.authForm.addControl(
        'userName',
        new FormControl('', Validators.required)
      );
    }
  }

  onSubmit() {
    const formData = this.authForm.value;
    console.log(formData);

    if (this.isLoginMode) {
      this.authService.login(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.localStorageService.setItem('userData',response.data);
            this.localStorageService.setItem('userId',response.data.id);
            console.log('Login successful:', response.data.id);
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
          this.localStorageService.setItem('userData',response);
          this.localStorageService.setItem('userId',response.id);
          const user = this.localStorageService.getItem('userData');
          console.log(user)
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
}
