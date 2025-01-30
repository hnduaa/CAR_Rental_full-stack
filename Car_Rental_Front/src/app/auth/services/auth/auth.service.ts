// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginResponse {
  email: string;
  role: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/login`, { email, password })
      .pipe(
        tap(response => {
          const role = response.role.toUpperCase();
          this.roleSubject.next(role);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userEmail', response.email);
        })
      );
  }

  getCurrentUserRole(): string | null {
    return this.roleSubject.value;
  }

  logout(): void {
    this.roleSubject.next(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  }


  register(data: { email: string; password: string; [key: string]: any }): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, data);
  }
}
