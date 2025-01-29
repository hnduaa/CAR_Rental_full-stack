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
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
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
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // Add phone validation
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
      gender: ['', Validators.required], // Added gender field
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]], // Added age field
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
      const { firstName, lastName, email, phoneNumber, password, gender, age } = this.signupForm.value;
      const signupRequest = {
        firstname: firstName,  // matched to backend
        lastname: lastName,    // matched to backend
        email,
        phoneNumber,
        password,
        gender,
        age
      };      
  
      this.authService.register(signupRequest).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => this.handleError(error),
      });
    }
  }
  // Handle errors
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
