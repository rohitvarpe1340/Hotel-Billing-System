import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   api =
  'http://localhost:5000/api/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getStats() {
    return this.http.get(
      `${this.api}/stats`
    );
  }
}
