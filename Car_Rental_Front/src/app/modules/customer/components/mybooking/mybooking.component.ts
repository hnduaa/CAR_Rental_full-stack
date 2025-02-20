import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from '../../../../components/booking-list/booking-list.component';
import { CarService } from '../../../../services/car.service';
import { Car } from '../../../../models/car.model';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mybooking',
  standalone: true,
  imports: [
    CommonModule,
    BookingListComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './mybooking.component.html',
  styles: [`
    .car-carousel {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color:rgba(70, 33, 33, 0.41);
      // background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
      padding: 2rem;
    border-radius: 10px;


    }
    .titles{
      color:rgb(27, 23, 82);
      // color: rgb(213, 213, 213);
    }
    .car-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }

    .car-card {
      width: 100%;
      max-width: 340px;
      border-radius: 12px;
      background-color: #fff;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease-in-out;
    }

    .car-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .car-image-container {
      width: 100%;
      height: 180px;
      overflow: hidden;
    }

    .car-image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .car-text {
      padding: 1rem;
      text-align: center;
    }

    .car-text mat-card-title {
      font-size: 1.4rem;
      font-weight: bold;
      color: #0d47a1;
      margin-bottom: 0.5rem;
    }

    .car-text mat-card-subtitle {
      font-size: 1rem;
      color: #333;
      opacity: 0.9;
      margin-bottom: 1rem;
    }

    .car-details {
      margin-top: 1rem;
      width: 100%;
      text-align: left;
      padding: 0 1rem;
    }

    .car-details p {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #333;
      line-height: 1.5;
    }

    .car-details p strong {
      font-weight: 600;
    }


    mat-card-actions {
      padding: 0 1rem 1rem;
      display: flex;
      justify-content: center;
      width: 100%;
    }

 app-booking-list{
  width: 90%;
 }

    @media (max-width: 1024px) {
      .car-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .car-list {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  `]
})
export class MybookingComponent implements OnInit {
  topRatedCars: Car[] = [];
  hoverRatings: { [key: number]: number | null } = {};

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getTopRatedCars().subscribe((cars) => {
      this.topRatedCars = cars
        .sort((a, b) => b.rating - a.rating) // Sort by rating in descending order
        .slice(0, 3); // Get only the top 3
    });
  }
  

  getEffectiveRating(carId: number): number {
    return this.hoverRatings[carId] ?? 0;
  }

  onStarClick(carId: number, rating: number) {
    console.log(`Rated car ${carId} with ${rating} stars`);
  }

  openBooking(car: Car) {
    console.log('Booking car:', car);
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-car.png';
  }
}
