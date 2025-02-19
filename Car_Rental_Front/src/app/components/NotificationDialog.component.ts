// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { AppNotification } from '../models/notification.model';

// @Component({
//   selector: 'app-notification-dialog',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="p-4">
//       <h2 class="text-lg font-semibold mb-2">Notification</h2>
//       <p class="text-gray-700 mb-4">{{ data.message }}</p>
//       <p class="text-xs text-gray-500">{{ formatDate(data.createdAt) }}</p>
//       <div class="flex justify-end mt-4">
//         <button mat-button color="primary" (click)="closeDialog()">OK</button>
//       </div>
//     </div>
//   `
// })
// export class NotificationDialogComponent {
//   constructor(
//     private dialogRef: MatDialogRef<NotificationDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: AppNotification
//   ) {}

//   closeDialog(): void {
//     this.dialogRef.close();
//   }

//   formatDate(dateStr: string): string {
//     if (!dateStr) return '';
//     return new Date(dateStr).toLocaleString();
//   }
// }
