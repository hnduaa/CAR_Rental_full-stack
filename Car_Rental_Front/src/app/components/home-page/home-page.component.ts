// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomeComponent {
  selectedLocation = '';
  pickupDate = '';
  returnDate = '';

  locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Miami',
    'Las Vegas'
  ];

  cars: Car[] = [
    {
      id: 1,
      name: 'Tesla Model 3',
      price: 89,
      image: '/assets/images/tesla-model-3.jpg',
      category: 'Electric',
      features: ['Autopilot', '350mi Range', 'Supercharging'],
      available: true
    },
    {
      id: 2,
      name: 'BMW X5',
      price: 120,
      image: '/assets/images/bmw-x5.jpg',
      category: 'SUV',
      features: ['AWD', 'Leather Seats', 'Panoramic Roof'],
      available: true
    },
    {
      id: 3,
      name: 'Mercedes C-Class',
      price: 95,
      image: '/assets/images/mercedes-c.jpg',
      category: 'Sedan',
      features: ['Premium Audio', 'GPS Navigation', 'Heated Seats'],
      available: false
    }
  ];

  benefits = [
    {
      icon: '🚗',
      title: 'Wide Selection',
      description: 'Choose from our diverse fleet of vehicles'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive rates and special offers'
    },
    {
      icon: '🔧',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      icon: '⭐',
      title: 'Easy Booking',
      description: 'Simple and fast reservation process'
    }
  ];

  searchCars() {
    console.log('Searching cars with:', {
      location: this.selectedLocation,
      pickup: this.pickupDate,
      return: this.returnDate
    });
  }

  bookCar(car: Car) {
    console.log('Booking car:', car);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}