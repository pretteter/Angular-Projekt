import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToDo } from '../_interface/todo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverURLStats =
    'https://todoverteilteanwendungen.herokuapp.com/api/stats';

  constructor(private http: HttpClient) {}

  public getStats(): Observable<any> {
    return this.http.get<any>(this.serverURLStats);
  }
}
