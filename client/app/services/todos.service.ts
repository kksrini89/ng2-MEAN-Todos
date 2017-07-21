import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Todo } from '../todo.model';

@Injectable()
export class TodoService {
    constructor(private _http: Http) {

    }

    getTodos() {
        return this._http.get('/api/v1/todos').map(res => res.json());
    }

    saveTodos(newTodo) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/todo', JSON.stringify(newTodo), { headers: headers })
            .map(res => res.json());
    }

    updateTodos(todo) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(`/api/v1/todos/${todo._id}`, JSON.stringify(todo), { headers: headers })
            .map(res => res.json());
    }
}