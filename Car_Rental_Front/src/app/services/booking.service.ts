import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/bookings'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  // Create a booking
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/create`, booking);
  }

  // Get all bookings (admin)
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/all`);
  }

  // Get a specific booking by ID
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  // Update the status of a booking (admin approves or rejects)
  updateBookingStatus(id: number, status: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/update-status/${id}?status=${status}`, {});
  }

  // Delete a booking (admin)
  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Get bookings for a specific user
  getUserBookings(userId: any): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }
}
