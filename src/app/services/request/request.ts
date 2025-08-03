import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Request {

  private server = 'http://localhost:3000/api/';
  
  private http = inject(HttpClient);

  constructor() { }

  get<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.server + endpoint);
  }

  post<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(this.server + endpoint, data);
  }

  put<T>(endpoint: string, data: any, id?: Number): Observable<T> {
    return this.http.put<T>(`${this.server}${endpoint}/${id?id:data.id}`, data);
  }

  delete<T>(endpoint: string, data: any): Observable<T> {
    return this.http.delete<T>(`${this.server}${endpoint}/${data.id}`);
  }
}
