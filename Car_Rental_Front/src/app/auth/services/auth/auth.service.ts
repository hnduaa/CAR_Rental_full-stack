import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, credentials, { 
      withCredentials: true 
    }).pipe(
      tap(response => {
        this.isAuthenticated = true;
        console.log('Login response:', response);
      })
    );
  }

  register(data: { email: string; password: string; [key: string]: any }): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, data);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}