import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  private apiUrl = 'http://localhost:5290/'; // Coloque a URL da sua API aqui

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Routes`);
  }

  post(origin: any, destination: any, value: any): Observable<any> {
    const payload = { origin, destination, value };
    return this.http.post<any>(`${this.apiUrl}Routes`, payload);
  }

  delete(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Routes/${id}`);
  }
}
