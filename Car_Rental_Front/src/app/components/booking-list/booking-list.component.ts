import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../services/car.service';
import { Booking } from '../../models/booking.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../../services/user.service';  // <-- Import UserService
import { MatIconModule } from '@angular/material/icon';
import { EditBookingDialogComponent } from './edit-booking-dialog.component';
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BookingListComponent implements OnInit {
  @Input() isAdmin: boolean = false; // Accept role from parent component
  bookings: Booking[] = [];
  loading: boolean = false; // To manage loading state

  // Store car names keyed by carId
  carNames: { [carId: number]: string } = {};
  // Store user details keyed by userId (for admin view)
  userDetails: { [userId: number]: any } = {};

  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    private userService: UserService,  // <-- Inject UserService
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.isAdmin) {
      // Admin sees all bookings
      this.bookingService.getAllBookings().subscribe(
        data => {
          this.bookings = data;
          this.loading = false;
          this.loadCarNames();      // Load car names after bookings are fetched
          this.loadUserDetails();   // Load user details for admin view
        },
        () => {
          this.loading = false;
          alert('Error loading bookings');
        }
      );
    } else {
      // User sees only their own bookings
      const userId = this.authService.getCurrentUserId(); // Get logged-in user ID
      this.bookingService.getUserBookings(userId).subscribe(
        data => {
          this.bookings = data;
          this.loading = false;
          this.loadCarNames(); // Load car names after bookings are fetched
        },
        () => {
          this.loading = false;
          alert('Error loading your bookings');
        }
      );
    }
  }

  // Load car names for each booking using CarService
  loadCarNames(): void {
    this.bookings.forEach(booking => {
      this.carService.getCarById(booking.carId).subscribe(
        car => {
          // Combine brand and car name for display
          this.carNames[booking.carId] = `${car.brandName} ${car.carName}`;
        },
        error => {
          console.error(`Error fetching car details for carId ${booking.carId}:`, error);
        }
      );
    });
  }

  // Load user details for each booking using UserService (only for admin)
  loadUserDetails(): void {
    this.bookings.forEach(booking => {
      this.userService.getUserById(booking.userId).subscribe(
        user => {
          // Store the user details in the object
          this.userDetails[booking.userId] = user;
        },
        error => {
          console.error(`Error fetching user details for userId ${booking.userId}:`, error);
        }
      );
    });
  }

  // Helper: Return the car name or a loading message if not yet available
  getCarName(carId: number): string {
    return this.carNames[carId] || 'Loading...';
  }

  // Helper: Return the user's full name or "Loading..." if not available yet
  getUserName(userId: number): string {
    if (this.userDetails[userId]) {
      return `${this.userDetails[userId].firstname} ${this.userDetails[userId].lastname}`;
    }
    return 'Loading...';
  }

  // Helper: Return the user's telephone number or "Loading..." if not available yet
  getUserPhone(userId: number): string {
    if (this.userDetails[userId]) {
      return this.userDetails[userId].phoneNumber;
    }
    return 'Loading...';
  }

  // Open a confirmation dialog before updating status
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

  // Update status (for Admin)
  updateStatus(id: number | undefined, status: string): void {
    if (id === undefined) {
      console.error('Invalid booking ID');
      return;  // Ne rien faire si l'ID est indéfini
    }
  
    this.bookingService.updateBookingStatus(id, status).subscribe(
      updatedBooking => {
        const bookingIndex = this.bookings.findIndex(booking => booking.id === id);
        if (bookingIndex > -1) {
          this.bookings[bookingIndex].status = status;
        }
      },
      error => {
        console.error('Error updating status:', error);
        alert('Error updating status');
      }
    );
  }
  

  openEditDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(EditBookingDialogComponent, {
      width: '500px',
      data: { ...booking } // On envoie une copie des données
    });
  
    dialogRef.afterClosed().subscribe(updatedBooking => {
      if (updatedBooking) {
        this.updateBooking(updatedBooking);
      }
    });
  }
  updateBooking(updatedBooking: Booking): void {
    this.bookingService.updateBooking(updatedBooking).subscribe(
      (updatedBookingResponse) => {
        // Mettre à jour la réservation dans la liste locale
        const bookingIndex = this.bookings.findIndex(booking => booking.id === updatedBookingResponse.id);
        if (bookingIndex > -1) {
          this.bookings[bookingIndex] = updatedBookingResponse; // Mettre à jour la réservation
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la réservation:', error);
        alert('Erreur lors de la mise à jour');
      }
    );
  }
    
  
  
  deleteBooking(id: number): void {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
    if (confirmation) {
      this.bookingService.deleteBooking(id).subscribe(
        () => {
          this.bookings = this.bookings.filter(booking => booking.id !== id);
        },
        error => console.error('Erreur lors de la suppression:', error)
      );
    }
  }
  
}
