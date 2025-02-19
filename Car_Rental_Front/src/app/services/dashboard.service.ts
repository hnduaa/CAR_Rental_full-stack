// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface TrendData {
//   labels: string[];
//   data: number[];
// }

// export interface GenderDistribution {
//   male: number;
//   female: number;
// }

// export interface DashboardStats {
//   totalBookings: number;
//   totalRevenue: number;
//   activeCars: number;
//   cancelledReservations: number;
//   revenueTrend: TrendData;
//   bookingsTrend: TrendData;
//   genderDistribution: GenderDistribution;
//   ageDistribution: TrendData;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {
//   private apiUrl = 'http://localhost:8080/api/dashboard';

//   constructor(private http: HttpClient) {}

//   getDashboardStats(): Observable<DashboardStats> {
//     return this.http.get<DashboardStats>(this.apiUrl);
//   }
// }
