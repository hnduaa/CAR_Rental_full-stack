import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
    private apiUrl = 'http://localhost:8080/api/cars'; // Backend URL
  
    constructor(private http: HttpClient) {}
  
    // Method to post a new car with image
    postCarWithImage(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/post`, formData, { withCredentials: true });
    }
  
    // Method to get all cars// Method to get all cars (Update the correct endpoint)
    getAllCars(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/all`, { withCredentials: true });
    }
    
  
  
    // Method to get a single car by ID
    getCarById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
  
    // Method to update a car
    updateCar(id: number, carData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/update/${id}`, carData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      });
    }
  
    // Method to delete a car
    deleteCar(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
    }
  }