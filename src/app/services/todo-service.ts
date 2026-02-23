import { inject, Injectable, signal } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoData } from 'src/app/models/TodoData';
import { HttpTodoService } from 'src/app/services/http-todo-service';

@Injectable({
    providedIn: 'root',
})
export class TodoService {

    private readonly httpTodoService = inject(HttpTodoService);

    private readonly _todoList = signal<Todo[]>([]);

    readonly todoList = this._todoList.asReadonly();

    constructor() {
        this.initTodoList();
    }

    addTodo(data: TodoData): void {
        const maxId = Math.max(0, ...this._todoList().map(t => t.id));
        const todo: Todo = {
            id: maxId + 1,
            title: data.title ?? '',
            description: data.description ?? null,
            status: 'IN_PROGRESS',
        };

        this.httpTodoService.createTodo(todo)
            .subscribe(created => {
                this._todoList.update(list => [...list, created]);
            });
    }

    deleteTodo(id: number): void {
        this.httpTodoService.deleteTodo(id)
            .subscribe(() => {
                this._todoList.update(list => list.filter(t => t.id !== id));
            });
    }

    updateTodo(id: number, data: TodoData): void {
        const current = this._todoList().find(t => t.id === id);
        if (!current) return;

        const updated: Todo = {...current, ...data};
        this.httpTodoService.updateTodo(updated)
            .subscribe(todo => {
                this._todoList.update(list =>
                    list.map(t => (t.id === id ? todo : t))
                );
            });
    }

    private initTodoList() {
        this.httpTodoService.getTodoList()
            .subscribe(todos => {
                this._todoList.set(todos);
            });
    }
}
