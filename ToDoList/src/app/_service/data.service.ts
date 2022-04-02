import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToDo } from "../_interface/todo";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverURL = "http://localhost:3000";

  constructor(
    private _http: HttpClient

  ) { }

  public getToDo(): Observable<ToDo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this._http.get<ToDo[]>(`${this.serverURL}/todos`, httpOptions);

  }

  public postToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this._http.post<ToDo>(`${this.serverURL}/todos`, object, httpOptions);

  }

  public deleteToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this._http.delete<ToDo>(`${this.serverURL}/todos/${object.id}`, httpOptions);

  }

  public putToDo(object: ToDo): Observable<ToDo> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this._http.put<ToDo>(`${this.serverURL}/todos/${object.id}`,object, httpOptions);

  }


}
