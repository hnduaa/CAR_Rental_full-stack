import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/auth'; // Corrected backend URL with protocol

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // User login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, credentials, { withCredentials: true });
  }

  // User registration
  register(data: { email: string; password: string; [key: string]: any }): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, data);
  }
}
