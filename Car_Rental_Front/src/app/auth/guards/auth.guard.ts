import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = this.authService.getCurrentUserRole();
    const expectedRole = route.data['role'];

    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && role !== expectedRole) {
      if (role === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else if (role === 'CUSTOMER') {
        this.router.navigate(['/customer/dashboard']);
      }
      return false;
    }

    return true;
  }
}