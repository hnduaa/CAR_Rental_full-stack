import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/notification.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // BehaviorSubject to hold the current list of notifications
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  // Expose notifications as an observable if needed elsewhere
  notifications$ = this.notificationsSubject.asObservable();

  // Adjust the URL to match your backend API
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) { }

  /**
   * Load notifications for a given user.
   * The backend returns notifications for the given user ID.
   */
  loadNotifications(userId: number): Observable<AppNotification[]> {
    // Assuming that your endpoint is "/user/{userId}"
    return this.http.get<AppNotification[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(notifications => {
        // Update the BehaviorSubject with the new notifications
        this.notificationsSubject.next(notifications);
      })
    );
  }

  /**
   * Mark a specific notification as read.
   * This sends a POST request to the backend.
   */
  markAsRead(notificationId: number): Observable<void> {
    // Using the endpoint defined as POST /api/notifications/{id}/read
    return this.http.post<void>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  /**
   * Clear notifications from the local state.
   * (Note: If you require a backend operation to clear notifications,
   * you should add that endpoint and update this method accordingly.)
   */
  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}
