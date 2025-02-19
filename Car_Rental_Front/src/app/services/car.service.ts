//car.service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

 // Import the Car model

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all cars
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/all`, { withCredentials: true });
  }

  // Get car by ID
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  // Create or post a new car
  postCar(car: Car, carImage: File): Observable<Car> {
    const formData = new FormData();
    formData.append('brandName', car.brandName);
    formData.append('carName', car.carName);
    formData.append('carType', car.carType);
    formData.append('transmission', car.transmission);
    formData.append('carColor', car.carColor);
    formData.append('modelYear', car.modelYear.toString());
    formData.append('pricePerDay', car.pricePerDay.toString());
    formData.append('description', car.description);
    formData.append('postedAt', car.postedAt);
    formData.append('carImage', carImage);

    return this.http.post<Car>(`${this.apiUrl}/post`, formData);
  }

  // Update car
  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/update/${id}`, car);
  }

  // Delete car
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  postCarWithImage(formData: FormData): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/post`, formData);
  }
}
