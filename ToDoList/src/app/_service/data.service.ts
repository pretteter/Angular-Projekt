import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToDo } from '../_interface/todo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverURL =
    'https://todoverteilteanwendungen.herokuapp.com/api/todos';

  constructor(private http: HttpClient) {}

  public getToDo(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.serverURL);
  }

  public postToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<ToDo>(this.serverURL, object, httpOptions);
  }

  public deleteToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<ToDo>(
      `${this.serverURL}/${object['_id']}`,
      httpOptions
    );
  }

  public putToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<ToDo>(
      `${this.serverURL}/${object['_id']}`,
      object,
      httpOptions
    );
  }
}
