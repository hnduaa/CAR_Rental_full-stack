import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'manage-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.scss'
})
export class ManageCarsComponent {

  // constructor(private authService: AuthService, private router: Router) {
  //   if (this.authService.getCurrentUserRole() !== 'ADMIN') {
  //     this.router.navigate(['/login']);
  //   }
  // }
}
