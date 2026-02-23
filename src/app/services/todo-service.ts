import { Injectable, signal } from "@angular/core";
import { Todo } from "src/app/models/Todo";
import { TodoInputData } from "src/app/models/TodoInputData";

@Injectable({
    providedIn: "root",
})
export class TodoService {

    private readonly _todoList = signal<Todo[]>([]);

    readonly todoList = this._todoList.asReadonly();

    constructor() {
        this.initTodoList();
    }

    addTodo(data: TodoInputData): void {
        const maxId = Math.max(0, ...this._todoList().map(t => t.id));
        const todo = {
            id: maxId + 1,
            text: data.text,
            description: data.description,
        };

        this._todoList.update(todoList => [...todoList, todo]);
    }

    deleteTodo(id: number): void {
        this._todoList.update(todoList => todoList.filter(t => t.id !== id))
    }

    updateTodo(id: number, data: TodoInputData): void {
        this._todoList.update(todoList => todoList.map(todo => todo.id === id ? {...todo, ...data} : todo))
    }

    private initTodoList() {
        const todoList = [];
        for (let i = 0; i < 5; i++) {
            const id = i + 1;
            todoList.push({id, text: `todo #${id}`, description: `description #${id}`});
        }

        this._todoList.set(todoList);
    }
}
