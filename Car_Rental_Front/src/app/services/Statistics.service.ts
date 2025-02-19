import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsData } from '../models/statistics.types';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8080/api/statistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsData> {
    return this.http.get<StatisticsData>(this.apiUrl);
  }
}
