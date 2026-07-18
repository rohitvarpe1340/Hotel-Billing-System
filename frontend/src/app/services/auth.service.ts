import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5000/api/auth";

  constructor(private http: HttpClient) {}

  
  register(data: FormData) {
    return this.http.post(
      'http://localhost:5000/api/auth/register',
      data
    );
  }

  login(data: any) {
    return this.http.post(
      'http://localhost:5000/api/auth/login',
      data
    );
  }
}
