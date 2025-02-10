// notification.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/notification.model';
import { AuthService } from '../auth/services/auth/auth.service';
import { RxStompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private rxStompService = inject(RxStompService);

  // Holds notifications to be displayed in your UI.
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    // Ensure this logic runs only in the browser.
    if (isPlatformBrowser(this.platformId)) {
      const role = this.authService.getCurrentUserRole();

      if (role === 'ADMIN') {
        // Subscribe to notifications meant for admins (e.g. new bookings).
        this.rxStompService.watch('/topic/admin-notifications').subscribe((message) => {
          const notif: AppNotification = {
            id: new Date().getTime().toString(),
            message: message.body,
            type: 'booking',
            read: false,
            timestamp: new Date()
          };
          this.addNotification(notif);
        });
      } else {
        // For regular users, subscribe to status updates.
        this.rxStompService.watch('/user/queue/notifications').subscribe((message) => {
          const notif: AppNotification = {
            id: new Date().getTime().toString(),
            message: message.body,
            type: 'status',
            read: false,
            timestamp: new Date()
          };
          this.addNotification(notif);
        });
      }

      // Optionally, subscribe to system-wide notifications.
      this.rxStompService.watch('/topic/system').subscribe((message) => {
        const notif: AppNotification = {
          id: new Date().getTime().toString(),
          message: message.body,
          type: 'system',
          read: false,
          timestamp: new Date()
        };
        this.addNotification(notif);
      });
    }
  }

  private addNotification(notification: AppNotification): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
  }

  // Marks a notification as read.
  markAsRead(notificationId: string): void {
    const updated = this.notificationsSubject.value.map((notif) =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    this.notificationsSubject.next(updated);
  }

  // Clears all notifications.
  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}
