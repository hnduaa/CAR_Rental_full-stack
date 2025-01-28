import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
 // Example: Your dashboard component

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Redirects empty path to the login route
  },
  {
    path: 'login',
    component: LoginComponent, // Login route
  },
  {
    path: 'register',
    component:SignupComponent, // Register route (if you have it)
  },
  {
    path: 'dashboard',
    component: CustomerDashboardComponent, // Dashboard route (secure page after login)
  },
  {
    path: '**',
    redirectTo: 'login', // Fallback for undefined routes
  },
];
