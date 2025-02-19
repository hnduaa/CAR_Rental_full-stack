//user.service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/users'; // Backend endpoint for user actions

  constructor(private http: HttpClient) {}

  // Use POST request to fetch user profile based on email
  getUserProfile(email: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/profile`, { email });
  }

  // Update user profile (if needed)
  updateUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/profile`, user);
  }

  // Delete user account
  deleteUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/delete`, { email, password })
      .pipe(
        catchError(error => {
          if (error.status === 200) {
            return of({ message: 'Account deleted successfully' });
          }
          return throwError(() => error);
        })
      );
  }
  
  // New method: Get user by ID using a GET request
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
