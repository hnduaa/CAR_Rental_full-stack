import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginResponse {
  id: number;      // New: Unique identifier for the user
  email: string;
  role: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to hold the current user's role
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  public role$ = this.roleSubject.asObservable();

  // BehaviorSubject to hold the current user's ID
  private userIdSubject = new BehaviorSubject<number | null>(
    localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!, 10) : null
  );
  public userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/login`, { email, password })
      .pipe(
        tap(response => {
          // Log the entire response to the console
          console.log('Backend response:', response);
  
          // Update the role BehaviorSubject and localStorage
          const role = response.role.toUpperCase();
          this.roleSubject.next(role);
          localStorage.setItem('userRole', role);
  
          // Update the email (if needed) in localStorage
          localStorage.setItem('userEmail', response.email);
  
          // Update the userId BehaviorSubject and localStorage
          this.userIdSubject.next(response.id);
          localStorage.setItem('userId', response.id.toString());
        })
      );
  }
  
  // Returns the current user's role
  getCurrentUserRole(): string | null {
    return this.roleSubject.value;
  }

  // Returns the current user's ID
  getCurrentUserId(): number | null {
    return this.userIdSubject.value;
  }

  logout(): void {
    this.roleSubject.next(null);
    this.userIdSubject.next(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  }

  register(data: { email: string; password: string; [key: string]: any }): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, data);
  }
}
