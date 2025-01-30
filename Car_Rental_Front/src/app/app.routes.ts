import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'admin/dashboard',
    loadComponent: () => import('./modules/admin/components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  { 
    path: 'customer/dashboard',
    loadComponent: () => import('./modules/customer/components/customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent),
    canActivate: [AuthGuard],
    data: { role: 'CUSTOMER' }
  },
  { 
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];