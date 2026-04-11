import { inject, Injectable, signal } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { CreateTodoData } from 'src/app/models/CreateTodoData';
import { HttpTodoService } from 'src/app/services/http-todo-service';
import { TodoContentData } from 'src/app/models/TodoContentData';
import { TodoStatusData } from 'src/app/models/TodoStatusData';
import { catchError, throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast-service';

@Injectable({
    providedIn: 'root',
})
export class TodoService {

    private readonly httpTodoService = inject(HttpTodoService);
    private readonly toastService = inject(ToastService);

    private readonly _todoList = signal<Todo[]>([]);

    readonly todoList = this._todoList.asReadonly();

    constructor() {
        this.initTodoList();
    }

    addTodo(data: CreateTodoData): void {
        const maxId = Math.max(0, ...this._todoList().map(t => +t.id));
        const todo: Todo = {
            id: maxId + 1 + '',
            title: data.title ?? '',
            description: data.description ?? null,
            status: 'IN_PROGRESS',
        };

        this.httpTodoService.createTodo(todo)
            .pipe(
                catchError(err => {
                    this.toastService.showToast($localize`:@@TodoAddFail:Failed to add todo`)
                    return throwError(() => err);
                }),
            )
            .subscribe(created => {
                this._todoList.update(list => [...list, created]);
                this.toastService.showToast($localize`:@@TodoAddSuccess:Todo added successfully`);
            });
    }

    deleteTodo(id: string): void {
        this.httpTodoService.deleteTodo(id)
            .pipe(
                catchError(err => {
                    this.toastService.showToast($localize`:@@TodoDeleteFail:Failed to delete todo`)
                    return throwError(() => err);
                }),
            )
            .subscribe(() => {
                this._todoList.update(list => list.filter(t => t.id !== id));
                this.toastService.showToast($localize`:@@TodoDeleteSuccess:Todo deleted successfully`);
            });
    }

    updateTodoContent(id: string, data: TodoContentData): void {
        const current = this._todoList().find(t => t.id === id);
        if (!current) return;

        const updated: Todo = {...current, ...data};
        this.httpTodoService.updateTodo(updated)
            .pipe(
                catchError(err => {
                    this.toastService.showToast($localize`:@@TodoUpdateFail:Failed to update todo`)
                    return throwError(() => err);
                }),
            )
            .subscribe(todo => {
                this._todoList.update(list =>
                    list.map(t => (t.id === id ? todo : t))
                );
                this.toastService.showToast($localize`:@@TodoUpdateSuccess:Todo updated successfully`);
            });
    }

    updateTodoStatus(id: string, data: TodoStatusData): void {
        const current = this._todoList().find(t => t.id === id);
        if (!current) return;

        const updated: Todo = {...current, ...data};

        this.httpTodoService.updateTodo(updated)
            .pipe(
                catchError(err => {
                    this.toastService.showToast($localize`:@@TodoUpdateStateFail:Failed to change todo status`)
                    return throwError(() => err);
                }),
            )
            .subscribe(todo => {
                this._todoList.update(list =>
                    list.map(t => (t.id === id ? todo : t))
                );
                this.toastService.showToast($localize`:@@TodoUpdateStateSuccess:Todo status changed successfully`);
            });
    }

    private initTodoList() {
        this.httpTodoService.getTodoList()
            .pipe(
                catchError(err => {
                    this.toastService.showToast($localize`:@@TodoGetAllFail:Failed to get todos`)
                    return throwError(() => err);
                }),
            )
            .subscribe(todos => {
                this._todoList.set(todos);
            });
    }
}
