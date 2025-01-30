import { AuthService } from './../../../../auth/services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  template: `<h1>Customer Dashboard</h1>`,
})
export class CustomerDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getCurrentUserRole() !== 'CUSTOMER') {
      this.router.navigate(['/login']);
    }
  }
}
