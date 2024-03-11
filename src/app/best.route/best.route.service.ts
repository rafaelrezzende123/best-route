import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BestRouteService {
  
  private apiUrl = 'http://localhost:5290/';

  constructor(private http: HttpClient) { }

  getBestRoute(origin: any, destination: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Routes/${origin}/${destination}`);
  }
}
