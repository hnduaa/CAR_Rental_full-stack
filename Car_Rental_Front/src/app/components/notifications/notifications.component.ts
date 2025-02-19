import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../auth/services/auth/auth.service';
import { AppNotification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <div class="notification-container">
      <button mat-icon-button
              [matMenuTriggerFor]="notificationMenu"
              class="notification-button">
        <i class="fa fa-bell"></i>
        <span class="notification-badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
      </button>

      <mat-menu #notificationMenu="matMenu" class="notification-menu" [overlapTrigger]="false">
        <div class="menu-header">
          <h3>Notifications</h3>
          <button mat-button color="warn" *ngIf="notifications.length > 0" (click)="clearAll()">
            Clear All
          </button>
        </div>

        <div class="menu-body" *ngIf="notifications.length > 0; else noNotif">
          <div *ngFor="let notification of notifications; trackBy: trackById" 
               class="notification-item"
               [class.unread]="!notification.read"
               (click)="markAsRead(notification.id)">
            <i class="{{ getNotificationIcon(notification) }}"></i>
            <div class="notification-content">
              <p class="message">{{ notification.message }}</p>
              <p class="date">{{ convertDate(notification.createdAt) | date:'short' }}</p>
            </div>
          </div>
        </div>

        <ng-template #noNotif>
          <div class="empty-state">
            <p>No notifications</p>
          </div>
        </ng-template>
      </mat-menu>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      font-family: 'Roboto', sans-serif;
    }

    .notification-container {
      position: relative;
    }

    .notification-button {
      position: relative;
      color: #4a5568; /* Gray-700 */
      transition: color 0.3s ease;
    }
    .notification-button:hover {
      color: #3182ce; /* Blue-600 */
    }
    .notification-button i {
      font-size: 1.5rem;
    }
    
    .notification-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background-color: #e53e3e; /* Red-600 */
      color: #fff;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 0.75rem;
      font-weight: bold;
      box-shadow: 0 0 2px rgba(0,0,0,0.4);
    }

    mat-menu.notification-menu {
      padding: 0;
      border-radius: 8px;
      min-width: 250px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }

    .menu-header {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0; /* Gray-200 */
      background-color: #f7fafc; /* Gray-50 */
    }
    .menu-header h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
      color: #2d3748; /* Gray-800 */
    }

    .menu-body {
      max-height: 300px;
      overflow-y: auto;
    }
    .notification-item {
      display: flex;
      padding: 12px 16px;
      align-items: flex-start;
      border-bottom: 1px solid #e2e8f0;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .notification-item:last-child {
      border-bottom: none;
    }
    .notification-item:hover {
      background-color: #edf2f7; /* Gray-100 */
    }
    .notification-item.unread {
      background-color: #ebf8ff; /* Blue-50 */
    }
    .notification-item i {
      font-size: 1.25rem;
      margin-right: 12px;
      color: #3182ce; /* Blue-600 */
    }
    .notification-content {
      flex: 1;
    }
    .notification-content .message {
      margin: 0;
      font-size: 0.9rem;
      color: #2d3748; /* Gray-800 */
    }
    .notification-content .date {
      margin: 4px 0 0;
      font-size: 0.75rem;
      color: #718096; /* Gray-500 */
    }

    .empty-state {
      padding: 16px;
      text-align: center;
      color: #718096; /* Gray-500 */
    }
  `]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  notifications: AppNotification[] = [];
  unreadCount: number = 0;

  private notificationsSub: Subscription | null = null;
  private authSubscription: Subscription | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authSubscription = this.authService.userId$.subscribe(userId => {
        if (userId) {
          this.loadNotifications(userId);
        } else {
          this.notifications = [];
          this.unreadCount = 0;
        }
      });
    }
  }

  private loadNotifications(userId: number): void {
    this.notificationsSub = this.notificationService.loadNotifications(userId)
      .subscribe(notifs => {
        this.notifications = notifs;
        this.unreadCount = notifs.filter(n => !n.read).length;
      });
  }

  ngOnDestroy(): void {
    this.notificationsSub?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  markAsRead(id: number): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.notificationService.markAsRead(id).subscribe(() => {
        this.notifications = this.notifications.map(n => {
          if (n.id === id) {
            return { ...n, read: true };
          }
          return n;
        });
        this.unreadCount = this.notifications.filter(n => !n.read).length;
      });
    }
  }

  clearAll(): void {
    this.notificationService.clearNotifications();
    this.notifications = [];
    this.unreadCount = 0;
  }

  trackById(index: number, item: AppNotification): number {
    return item.id;
  }

  getNotificationIcon(notification: AppNotification): string {
    if (notification.message.toLowerCase().includes('réservation')) {
      return 'fa fa-calendar-check';
    }
    if (notification.message.toLowerCase().includes('étoiles')) {
      return 'fa fa-star';
    }
    return 'fa fa-bell';
  }

  convertDate(dateStr?: string): Date | null {
    return dateStr ? new Date(dateStr) : null;
  }
}
