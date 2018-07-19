import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(private http: Http) {}

  getAllTodos() {
    return this.http.get('/api/todos').map(res => res.json());
  }

  addTodo(newTodo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/todo', JSON.stringify(newTodo), {headers: headers})
              .map(res => res.json());
  }


  removeTodo(id) {
    return this.http.delete(`/api/todo/${id}`).map(res => res.json());
  }

  updateStatus(todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`/api/todo/${todo._id}`, JSON.stringify(todo), {headers: headers})
              .map(res => res.json()); 
  }

}