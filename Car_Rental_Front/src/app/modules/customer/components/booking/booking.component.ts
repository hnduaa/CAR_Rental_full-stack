import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../../../services/booking.service';
import { UserService } from '../../../../services/user.service'; // Import UserService
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],  // Add CommonModule here
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  cars: any[] = [];
  booking: any = {
    carId: 0,
    userId: 0,  // Dynamically populated later
    fromDate: '',
    toDate: '',
    days: 0,
    totalPrice: 0,
    status: 'Pending'
  };
  user: any = {};  // Store user info
  isModalOpen: boolean = false; // For modal control

  private bookingService = inject(BookingService);
  private carService = inject(CarService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getCars();  // Fetch cars
    this.getUser();  // Fetch logged-in user info
  }

  // Fetch cars from the API
  getCars(): void {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  // Fetch the logged-in user's information based on email stored in localStorage
  getUser(): void {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userService.getUserProfile(email).subscribe(
        (data) => {
          this.user = data;  // Store user data
          this.booking.userId = this.user.id;  // Set user ID in booking object
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User email not found in localStorage.');
      // Optionally, navigate to login page if user is not found
      this.router.navigate(['/login']);
    }
  }

  // Calculate the number of days and total price for the booking
  calculateBookingDetails(): void {
    if (this.booking.fromDate && this.booking.toDate) {
      const from = new Date(this.booking.fromDate);
      const to = new Date(this.booking.toDate);
      const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
      this.booking.days = days;

      const car = this.cars.find(car => car.id === this.booking.carId);
      if (car) {
        this.booking.totalPrice = car.pricePerDay * days;
      }
    }
  }

  // Submit the booking form
  submitBooking(): void {
    this.bookingService.createBooking(this.booking).subscribe(
      (response) => {
        alert('Booking successful!');
        this.router.navigate(['/']);  // Navigate to home page or another page
      },
      (error) => {
        alert('Error booking the car. Please try again.');
        console.error(error);
      }
    );
  }

  // Open the modal for booking confirmation or any additional step
  openBookingModal(): void {
    this.isModalOpen = true;
  }

  // Close the booking modal
  closeBookingModal(): void {
    this.isModalOpen = false;
  }
}
