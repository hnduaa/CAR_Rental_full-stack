import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from '../../../../components/booking-list/booking-list.component';
import { NotificationsComponent } from '../../../../components/notifications/notifications.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BookingListComponent, NotificationsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  isSidebarCollapsed = false;

  updateSidebarState(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
