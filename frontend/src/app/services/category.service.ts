import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) {}

  // JWT Header
  private getHeaders() {

    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`
      })
    };
  }

  // Get All Categories
  getCategories() {
    return this.http.get(
      this.api,
      this.getHeaders()
    );
  }

  // Add Category
  addCategory(data: any) {
    return this.http.post(
      this.api,
      data,
      this.getHeaders()
    );
  }

  // Update Category
  updateCategory(id: number, data: any) {
    return this.http.put(
      `${this.api}/${id}`,
      data,
      this.getHeaders()
    );
  }

  // Delete Category
  deleteCategory(id: number) {
    return this.http.delete(
      `${this.api}/${id}`,
      this.getHeaders()
    );
  }

  // Change Status
  changeStatus(id: number, status: any) {
    return this.http.put(
      `${this.api}/status/${id}`,
      status,
      this.getHeaders()
    );
  }

  // Update Status
  updateStatus(id: number, data: any) {
    return this.http.put(
      `${this.api}/status/${id}`,
      data,
      this.getHeaders()
    );
  }
}
