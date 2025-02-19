//rating.service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // Base URL for your backend rating endpoints
  private baseUrl = 'http://localhost:8080/ratings';

  constructor(private http: HttpClient) {}

  // Updated submitRating method to include the userId parameter
  submitRating(carId: number, userId: number, rating: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/submit?carId=${carId}&userId=${userId}&rating=${rating}`,
      {} // Empty body
    );
  }

  // Optional method to get the average rating for a car
  getAverageRating(carId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average/${carId}`);
  }
}
