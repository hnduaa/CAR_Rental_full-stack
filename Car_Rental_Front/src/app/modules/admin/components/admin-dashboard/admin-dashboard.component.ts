import { AuthService } from './../../../../auth/services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `<h1>Admin Dashboard</h1>`,
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getCurrentUserRole() !== 'ADMIN') {
      this.router.navigate(['/login']);
    }
  }
}
