import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { StatisticsService } from '../../../../services/Statistics.service';

interface StatisticsData {
  totalBookings: number;
  totalRevenue: number;
  activeCars: number;
  cancelledReservations: number;
  genderDistribution: { [key: string]: number };
  ageDistribution: { [key: string]: number };
  monthlyRevenue: MonthlyData[];
  monthlyBookings: MonthlyData[];
}

interface MonthlyData {
  month: string;
  value: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = true;
  error: string | null = null;

  // KPI values
  totalBookings: number = 0;
  totalRevenue: number = 0;
  activeCars: number = 0;
  cancelledReservations: number = 0;

  private charts: { [key: string]: Chart } = {};

  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Destroy all existing charts
    Object.values(this.charts).forEach(chart => chart.destroy());
  }

  loadStatistics(): void {
    this.isLoading = true;
    this.error = null;
    
    this.statisticsService.getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: StatisticsData) => {
          this.updateDashboard(data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading statistics:', err);
          this.error = 'Failed to load dashboard data. Please try again.';
          this.isLoading = false;
        }
      });
  }

  private updateDashboard(data: StatisticsData): void {
    // Update KPIs
    this.totalBookings = data.totalBookings;
    this.totalRevenue = data.totalRevenue;
    this.activeCars = data.activeCars;
    this.cancelledReservations = data.cancelledReservations;

    // Delay chart creation to allow Angular to render the canvas elements.
    setTimeout(() => {
      this.createRevenueChart(data.monthlyRevenue);
      this.createBookingsChart(data.monthlyBookings);
      this.createGenderChart(data.genderDistribution);
      this.createAgeChart(data.ageDistribution);
    }, 0);
  }

  private createRevenueChart(monthlyData: MonthlyData[]): void {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Revenue chart canvas not found.');
      return;
    }
    if (this.charts['revenueChart']) {
      this.charts['revenueChart'].destroy();
    }
    this.charts['revenueChart'] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: monthlyData.map(item => item.month),
        datasets: [{
          label: 'Monthly Revenue (MAD)',
          data: monthlyData.map(item => item.value),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { mode: 'index' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} MAD`
            }
          }
        }
      }
    });
  }

  private createBookingsChart(monthlyData: MonthlyData[]): void {
    const canvas = document.getElementById('bookingsChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Bookings chart canvas not found.');
      return;
    }
    if (this.charts['bookingsChart']) {
      this.charts['bookingsChart'].destroy();
    }
    this.charts['bookingsChart'] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: monthlyData.map(item => item.month),
        datasets: [{
          label: 'Monthly Bookings',
          data: monthlyData.map(item => item.value),
          backgroundColor: 'rgb(99, 102, 241)',
          borderColor: 'rgb(79, 82, 221)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  private createGenderChart(genderData: { [key: string]: number }): void {
    const canvas = document.getElementById('genderChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Gender chart canvas not found.');
      return;
    }
    if (this.charts['genderChart']) {
      this.charts['genderChart'].destroy();
    }
    this.charts['genderChart'] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: Object.keys(genderData),
        datasets: [{
          data: Object.values(genderData),
          backgroundColor: [
            'rgb(27, 79, 163)',  // Blue
            'rgb(129, 60, 94)'   // Pink
          ]
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

  private createAgeChart(ageData: { [key: string]: number }): void {
    const canvas = document.getElementById('ageChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Age chart canvas not found.');
      return;
    }
    if (this.charts['ageChart']) {
      this.charts['ageChart'].destroy();
    }
    this.charts['ageChart'] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Object.keys(ageData),
        datasets: [{
          label: 'Users by Age Group',
          data: Object.values(ageData),
          backgroundColor: 'rgb(234, 88, 12)',
          borderColor: 'rgb(214, 68, 0)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
}
