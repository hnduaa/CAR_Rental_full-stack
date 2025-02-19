import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, signal, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { BookingComponent } from '../booking/booking.component';
import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
import { RatingService } from '../../../../services/rating.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { BookingService } from '../../../../services/booking.service';
import { Booking } from '../../../../models/booking.model';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from '../../../../components/notifications/notifications.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    NotificationsComponent,
    MatSnackBarModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private router = inject(Router);
  private carService = inject(CarService);
  private ratingService = inject(RatingService);
  private bookingService = inject(BookingService);
  private snackBar = inject(MatSnackBar);

  isBrowser = isPlatformBrowser(this.platformId);
  cars = signal<Car[]>([]); // Holds all available cars
  showBooking = signal<boolean>(false);
  selectedCar: Car | null = null;

  // Each car's hover rating is stored by car ID (null means no hover)
  hoverRatings: { [carId: number]: number | null } = {};
  // Persisted ratings for each car (loaded from backend)
  carRatings: { [carId: number]: number } = {};

  // Booking form model; carId is initialized to 0 (since type number is required)
  booking: Booking = {
    carId: 0,
    userId: this.authService.getCurrentUserId() || 0,
    fromDate: '',
    toDate: '',
    days: 0,
    totalPrice: 0,
    status: 'Pending'
  };

  carouselContainer: HTMLElement | null = null;

  ngOnInit(): void {
    if (this.authService.getCurrentUserRole() !== 'CUSTOMER') {
      this.router.navigate(['/login']);
      return;
    }
    this.fetchCars();
  }

  ngOnDestroy(): void {
    // Cleanup if necessary
  }

  ngAfterViewInit(): void {
    this.carouselContainer = document.querySelector('.car-list');
  }

  nextSlide(): void {
    if (this.carouselContainer) {
      this.carouselContainer.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  prevSlide(): void {
    if (this.carouselContainer) {
      this.carouselContainer.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  fetchCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        console.log('Fetched cars:', data);
        this.cars.set(data);
        // Initialize ratings and hover state for each car.
        this.cars().forEach((car) => {
          this.carRatings[car.id] = car.rating || 0;
          this.hoverRatings[car.id] = null;
        });
      },
      error: (err) => console.error('Error fetching cars:', err)
    });
  }

  // Returns the effective rating for a car:
  // If a hover value exists, it takes precedence; otherwise, the stored rating is used.
  getEffectiveRating(carId: number): number {
    return this.hoverRatings[carId] !== null ? this.hoverRatings[carId]! : (this.carRatings[carId] || 0);
  }

  // Handles click events on a star icon.
  onStarClick(carId: number, star: number): void {
    console.log(`Star ${star} clicked for car ID ${carId}`);
    this.rateCar(carId, star);
  }

  // Submits a rating for a car.
  rateCar(carId: number, rating: number): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      console.error('User is not logged in or user ID is not available.');
      return;
    }
    // Immediately update the local rating for a responsive UI.
    this.carRatings[carId] = rating;
    this.ratingService.submitRating(carId, userId, rating).subscribe({
      next: () => {
        console.log(`Rating submitted for car ${carId}: ${rating}`);
        this.hoverRatings[carId] = null; // Reset hover state.
        // Afficher un message de confirmation
        this.snackBar.open('Rating submitted', 'Close', { duration: 3000 });
      },
      error: (err) => console.error('Error submitting rating', err)
    });
  }

  // Opens the booking form pop-up and pre-fills booking data.
  openBooking(car: Car): void {
    this.selectedCar = car;
    this.booking.carId = car.id;
    // Optionally set default dates here if needed.
    this.showBooking.set(true);
  }

  // Closes the booking form and resets the booking model.
  closeBooking(): void {
    this.showBooking.set(false);
    this.selectedCar = null;
    this.booking = {
      carId: 0,
      userId: this.authService.getCurrentUserId() || 0,
      fromDate: '',
      toDate: '',
      days: 0,
      totalPrice: 0,
      status: 'Pending'
    };
  }

  // Calculates booking details (days and total price) when dates change.
  calculateBookingDetails(): void {
    if (this.booking.fromDate && this.booking.toDate && this.selectedCar) {
      const from = new Date(this.booking.fromDate);
      const to = new Date(this.booking.toDate);
      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
      this.booking.days = diffDays > 0 ? diffDays : 0;
      // Assume car.pricePerDay is numeric or convertible to a number.
      this.booking.totalPrice = this.booking.days * Number(this.selectedCar.pricePerDay);
    }
  }

  // Submits the booking form.
  submitBooking(): void {
    if (!this.booking.fromDate || !this.booking.toDate || !this.booking.carId) return;
    this.bookingService.createBooking(this.booking).subscribe({
      next: (response) => {
        console.log('Booking submitted successfully', response);
        this.closeBooking();
      },
      error: (err) => console.error('Error submitting booking', err)
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-car.jpg';
  }
}
