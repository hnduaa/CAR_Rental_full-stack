import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomeComponent {
  // Example variables (if needed in the future)
  selectedLocation = '';
  pickupDate = '';
  returnDate = '';

  locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'];

  // Benefits data with modern Font Awesome icons
  benefits = [
    {
      icon: 'fas fa-car-side',
      title: 'Wide Selection',
      description: 'Choose from our diverse fleet of vehicles'
    },
    {
      icon: 'fas fa-tags',
      title: 'Best Prices',
      description: 'Competitive rates and special offers'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Easy Booking',
      description: 'Simple and fast reservation process'
    }
  ];

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
