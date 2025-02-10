// // src/app/features/customer/components/customer-notifications.component.ts
// import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { NotificationService, Notification } from '../../../services/notification.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-customer-notifications',
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
//                  [matBadgeHidden]="unreadCount() === 0"
//                  matBadgeColor="warn"
//                  class="text-gray-600">
//           notifications
//         </mat-icon>
//       </button>

//       <mat-menu #notificationMenu="matMenu" 
//                 class="w-96"
//                 [overlapTrigger]="false">
//         <div class="p-4">
//           <div class="flex justify-between items-center mb-3">
//             <h3 class="text-lg font-medium">My Notifications</h3>
//             @if (notifications().length > 0) {
//               <button mat-button 
//                       color="warn" 
//                       (click)="clearAll()">
//                 Clear All
//               </button>
//             }
//           </div>

//           @if (notifications().length === 0) {
//             <p class="text-gray-500 text-center py-4">
//               No notifications
//             </p>
//           } @else {
//             <div class="max-h-96 overflow-y-auto">
//               @for (notification of notifications(); track notification.id) {
//                 <div class="p-3 hover:bg-gray-50 border-b border-gray-100"
//                      [class.bg-blue-50]="!notification.read"
//                      (click)="markAsRead(notification.id)">
//                   @switch (notification.type) {
//                     @case ('status') {
//                       <div class="flex items-start">
//                         <mat-icon class="text-green-500 mr-2">
//                           {{notification.data?.status === 'APPROVED' ? 'check_circle' : 'cancel'}}
//                         </mat-icon>
//                         <div>
//                           <p class="text-sm text-gray-800">{{ notification.message }}</p>
//                           <p class="text-xs text-gray-500 mt-1">
//                             {{ notification.timestamp | date:'short' }}
//                           </p>
//                           @if (notification.data?.bookingId) {
//                             <button mat-button color="primary" class="mt-2">
//                               View Booking
//                             </button>
//                           }
//                         </div>
//                       </div>
//                     }
//                     @case ('system') {
//                       <div class="flex items-start">
//                         <mat-icon class="text-gray-500 mr-2">info</mat-icon>
//                         <div>
//                           <p class="text-sm text-gray-800">{{ notification.message }}</p>
//                           <p class="text-xs text-gray-500 mt-1">
//                             {{ notification.timestamp | date:'short' }}
//                           </p>
//                         </div>
//                       </div>
//                     }
//                   }
//                 </div>
//               }
//             </div>
//           }
//         </div>
//       </mat-menu>
//     </div>
//   `
// })
// export class CustomerNotificationsComponent implements OnInit, OnDestroy {
//   private platformId = inject(PLATFORM_ID);
//   private notificationService = inject(NotificationService);
  
//   notifications = signal<Notification[]>([]);
//   unreadCount = signal<number>(0);
//   private subscription: Subscription | null = null;

//   ngOnInit() {
//     if (isPlatformBrowser(this.platformId)) {
//       this.subscription = this.notificationService.getNotifications()
//         .subscribe(notifications => {
//           this.notifications.set(notifications);
//           this.unreadCount.set(
//             notifications.filter(n => !n.read).length
//           );
//         });
//     }
//   }

//   ngOnDestroy() {
//     this.subscription?.unsubscribe();
//   }

//   markAsRead(id: string) {
//     this.notificationService.markAsRead(id);
//   }

//   clearAll() {
//     this.notificationService.clearNotifications();
//   }
// }