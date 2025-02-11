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
    private router: Router
  ) {}

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
          console.log('Login successful:', response);
          if (response.status) {
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
