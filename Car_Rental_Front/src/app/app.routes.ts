import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/home-page/home-page.component';

export const appRoutes: Routes = [
  { path: '',redirectTo: 'Home',pathMatch: 'full',},
  {path: 'login',component: LoginComponent,},
  {path: 'register',component:SignupComponent,},
  {path: 'dashboard',component: CustomerDashboardComponent,},
  { path: '**',redirectTo: 'Home', },
  {path: 'Home',component: HomeComponent,},

];
