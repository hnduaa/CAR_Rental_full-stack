import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  // KPI values for overall business statistics
  totalBookings: number = 145;
  totalRevenue: number = 23500; // In dollars
  activeCars: number = 34;
  cancelledReservations: number = 7;

  // Simulated user data analytics:
  // For Gender Distribution
  maleUsers: number = 60;
  femaleUsers: number = 40;
  
  // For Age Distribution, we group ages into categories
  ageGroups: string[] = ['18-25', '26-35', '36-45', '46-55', '55+'];
  ageGroupCounts: number[] = [30, 40, 20, 5, 5]; // Sample data

  constructor() {
    // Register all Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadRevenueChart();
    this.loadBookingsChart();
    this.loadGenderChart();
    this.loadAgeChart();
  }

  loadRevenueChart(): void {
    const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue ($)',
          data: [15000, 18000, 12000, 22000, 25000, 23000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }

  loadBookingsChart(): void {
    const bookingsCtx = document.getElementById('bookingsChart') as HTMLCanvasElement;
    new Chart(bookingsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Bookings',
          data: [45, 55, 65, 70, 80, 90],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  loadGenderChart(): void {
    const genderCtx = document.getElementById('genderChart') as HTMLCanvasElement;
    new Chart(genderCtx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          label: 'Gender Distribution',
          data: [this.maleUsers, this.femaleUsers],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',  // Blue for Male
            'rgba(255, 99, 132, 0.6)'   // Red for Female
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  loadAgeChart(): void {
    const ageCtx = document.getElementById('ageChart') as HTMLCanvasElement;
    new Chart(ageCtx, {
      type: 'bar',
      data: {
        labels: this.ageGroups,
        datasets: [{
          label: 'User Age Distribution',
          data: this.ageGroupCounts,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
