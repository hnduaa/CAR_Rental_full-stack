import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './components/home-page/home-page.component';
import { PostCarComponent } from './modules/admin/components/post-car/post-car.component';
import { ManageCarsComponent } from './modules/admin/components/manage-cars/manage-cars.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './modules/admin/components/statistics/statistics.component';
import { MybookingComponent } from './modules/customer/components/mybooking/mybooking.component';

export const routes: Routes = [
  //public routes 
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignupComponent},
  { path: 'Home',component:HomeComponent},
  { path: '',redirectTo: 'Home',pathMatch: 'full'},

  //private admin

  { path: 'admin', component: LayoutComponent, canActivate: [AuthGuard],data: { role: 'ADMIN' },
  children: [
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    { path: 'post-car', component: PostCarComponent, canActivate: [AuthGuard] },
    { path: 'manage-cars', component: ManageCarsComponent, canActivate: [AuthGuard] },
    {path:'profile',component:ProfileComponent,canActivate: [AuthGuard] },
    {path:'statistics',component:StatisticsComponent,canActivate: [AuthGuard] },
    { path: '', redirectTo: 'post-car', pathMatch: 'full' } // Redirection par défaut
  ]},

  //private custumor
  { path: 'customer', component: LayoutComponent, canActivate: [AuthGuard],data: { role: 'CUSTOMER' },
children: [
  { path: 'dashboard',component: CustomerDashboardComponent,canActivate: [AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate: [AuthGuard] },
  {path:'my-bookings',component:MybookingComponent,canActivate: [AuthGuard] },

]

  }
];