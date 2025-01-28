import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  AbstractControl,
  ValidationErrors 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // For navigation
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router 
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });
  }

  // Custom password match validator
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value 
      ? null 
      : { passwordMismatch: true };
  }

  // Form submission handler
  onSubmit() {
    this.submitted = true;
  
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
  
      const signupRequest = { firstname: firstName, lastname: lastName, email, password };
  
      this.authService.register(signupRequest).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => this.handleError(error),
      });
    }
  }
  
  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Signup error:', error);
  
    if (error.status === 406 && typeof error.error === 'string') {
      this.signupForm.get('email')?.setErrors({ emailExists: true });
    } else {
      this.errorMessage = 'Registration failed. Please try again.';
    }
  }
  
  
  // Getter methods for template access
  get f() {
    return this.signupForm.controls;
  }
}
