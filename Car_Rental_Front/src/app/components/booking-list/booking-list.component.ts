import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  standalone: true,
  imports: [CommonModule,]  // Import Material Dialog
})
export class BookingListComponent implements OnInit {
  @Input() isAdmin: boolean = false; // Accept role from parent component
  bookings: Booking[] = [];
  loading: boolean = false; // To manage loading state

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.isAdmin) {
      // Admin sees all bookings
      this.bookingService.getAllBookings().subscribe(data => {
        this.bookings = data;
        this.loading = false;
      }, () => {
        this.loading = false;
        alert('Error loading bookings');
      });
    } else {
      // User sees only their own bookings
      const userId = this.authService.getCurrentUserId(); // Get logged-in user ID
      this.bookingService.getUserBookings(userId).subscribe(data => {
        this.bookings = data;
        this.loading = false;
      }, () => {
        this.loading = false;
        alert('Error loading your bookings');
      });
    }
  }

  // Method to open a confirmation dialog before updating status
  openConfirmationDialog(id: number, status: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to mark this booking as ${status}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateStatus(id, status);
      }
    });
  }

  // Method to update status (for Admin)
  updateStatus(id: number | undefined, status: string): void {
    if (id === undefined) {
      console.error('Invalid booking ID');
      return;
    }
  
    this.bookingService.updateBookingStatus(id, status).subscribe(updatedBooking => {
      const bookingIndex = this.bookings.findIndex(booking => booking.id === id);
      if (bookingIndex > -1) {
        this.bookings[bookingIndex].status = status;
      }
    }, error => {
      console.error('Error updating status:', error);
      alert('Error updating status');
    });
  }
  
}
