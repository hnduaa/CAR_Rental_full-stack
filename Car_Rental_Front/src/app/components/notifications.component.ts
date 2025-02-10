// import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { Subscription } from 'rxjs';
// import { NotificationService } from '../services/notification.service';
// import { AppNotification } from '../models/notification.model';

// @Component({
//   selector: 'app-notifications',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatIconModule,
//     MatBadgeModule,
//     MatButtonModule,
//     MatMenuModule,
//   ],
//   template: `
//     <div class="relative">
//       <button mat-icon-button 
//               [matMenuTriggerFor]="notificationMenu"
//               class="relative">
//         <mat-icon [matBadge]="unreadCount()" 
//                   [matBadgeHidden]="unreadCount() === 0"
//                   matBadgeColor="warn"
//                   class="text-gray-600">
//           notifications
//         </mat-icon>
//       </button>

//       <mat-menu #notificationMenu="matMenu" class="w-96" [overlapTrigger]="false">
//         <div class="p-4">
//           <div class="flex justify-between items-center mb-3">
//             <h3 class="text-lg font-medium">
//               {{ role === 'admin' ? 'Admin Notifications' : 'My Notifications' }}
//             </h3>
//             <button mat-button color="warn" *ngIf="notifications().length > 0" (click)="clearAll()">
//               Clear All
//             </button>
//           </div>

//           <p class="text-gray-500 text-center py-4" *ngIf="notifications().length === 0">
//             No notifications
//           </p>

//           <div class="max-h-96 overflow-y-auto" *ngIf="notifications().length > 0">
//             <div *ngFor="let notification of notifications(); trackBy: trackById">
//               <div class="p-3 hover:bg-gray-50 border-b border-gray-100"
//                    [class.bg-blue-50]="!notification.read"
//                    (click)="markAsRead(notification.id)">
                
//                 <!-- Admin view: Show booking notifications -->
//                 <ng-container *ngIf="role === 'admin'">
//                   <div *ngIf="notification.type === 'booking'" class="flex items-start">
//                     <mat-icon class="text-blue-500 mr-2">book_online</mat-icon>
//                     <div>
//                       <p class="text-sm text-gray-800">{{ notification.message }}</p>
//                       <p class="text-xs text-gray-500 mt-1">
//                         {{ notification.timestamp | date:'short' }}
//                       </p>
//                       <button mat-button color="primary" *ngIf="notification.data?.bookingId" class="mt-2">
//                         View Booking
//                       </button>
//                     </div>
//                   </div>
//                 </ng-container>

//                 <!-- Customer view: Show status notifications -->
//                 <ng-container *ngIf="role === 'customer'">
//                   <div *ngIf="notification.type === 'status'" class="flex items-start">
//                     <mat-icon class="text-green-500 mr-2">
//                       {{ notification.data?.status === 'APPROVED' ? 'check_circle' : 'cancel' }}
//                     </mat-icon>
//                     <div>
//                       <p class="text-sm text-gray-800">{{ notification.message }}</p>
//                       <p class="text-xs text-gray-500 mt-1">
//                         {{ notification.timestamp | date:'short' }}
//                       </p>
//                       <button mat-button color="primary" *ngIf="notification.data?.bookingId" class="mt-2">
//                         View Booking
//                       </button>
//                     </div>
//                   </div>
//                 </ng-container>

//                 <!-- System notifications -->
//                 <ng-container *ngIf="notification.type === 'system'">
//                   <div class="flex items-start">
//                     <mat-icon class="text-gray-500 mr-2">info</mat-icon>
//                     <div>
//                       <p class="text-sm text-gray-800">{{ notification.message }}</p>
//                       <p class="text-xs text-gray-500 mt-1">
//                         {{ notification.timestamp | date:'short' }}
//                       </p>
//                     </div>
//                   </div>
//                 </ng-container>
//               </div>
//             </div>
//           </div>
//         </div>
//       </mat-menu>
//     </div>
//   `
// })
// export class NotificationsComponent implements OnInit, OnDestroy {
//   @Input() role: 'admin' | 'customer' = 'customer';

//   private platformId = inject(PLATFORM_ID);
//   private notificationService = inject(NotificationService);
  
//   // Using Angular signals to hold the current notifications and unread count.
//   notifications = signal<AppNotification[]>([]);
//   unreadCount = signal<number>(0);
  
//   private subscription: Subscription | null = null;

//   ngOnInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       // Subscribe to notifications$ from NotificationService.
//       this.subscription = this.notificationService.notifications$.subscribe((notifs) => {
//         this.notifications.set(notifs);
//         this.unreadCount.set(notifs.filter(n => !n.read).length);
//       });
//     }
//   }

//   ngOnDestroy(): void {
//     this.subscription?.unsubscribe();
//   }

//   markAsRead(id: string): void {
//     this.notificationService.markAsRead(id);
//   }

//   clearAll(): void {
//     this.notificationService.clearNotifications();
//   }

//   trackById(index: number, item: AppNotification): string {
//     return item.id;
//   }
// }
