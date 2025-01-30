import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    // Clear any existing auth data on component init
    this.authService.logout();
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.loginError = false; // Reset error state

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          const role = response.role.toUpperCase();
          
          // Navigate based on user role
          if (role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'CUSTOMER') {
            this.router.navigate(['/customer/dashboard']);
          } else {
            console.error('Unknown role:', role);
            this.loginError = true;
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loginError = true;
          // Optional: Reset form on error
          // this.loginForm.reset();
          this.submitted = false;
        }
      });
    }
  }

  // Optional: Reset form state when user starts typing again
  onInputChange() {
    if (this.submitted) {
      this.loginError = false;
    }
  }
}