import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/models/Todo';
import { environment } from 'src/app/config/environment';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class HttpTodoService {

    private readonly http = inject(HttpClient);

    public getTodoList(): Observable<Todo[]> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Todo[]>(`${environment.apiUrl}/todos`, {headers})
    }

    public createTodo(todo: Todo) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<Todo>(`${environment.apiUrl}/todos`, todo, {headers})
    }

    public deleteTodo(id: number) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete<Todo>(`${environment.apiUrl}/todos/${id}`, {headers})
    }

    public updateTodo(todo: Todo) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put<Todo>(`${environment.apiUrl}/todos/${todo.id}`, todo, {headers})
    }
}
