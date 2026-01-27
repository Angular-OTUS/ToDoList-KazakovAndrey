import { ChangeDetectionStrategy, signal, Component, OnInit } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { TodoInput } from "src/app/components/todo-input/todo-input";
import { TodoItem } from "src/app/components/todo-item/todo-item";
import { Todo } from "src/app/models/Todo";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-todo-list",
    templateUrl: "./todo-list.html",
    imports: [
        TodoItem,
        TodoInput,
        MatProgressSpinner,
    ],
})
export class TodoList implements OnInit {

    protected readonly isLoading = signal<boolean>(true);
    protected readonly title = "Todo List";
    protected readonly todoList = signal<Todo[]>([]);

    ngOnInit() {
        this.initTodoList();

        setTimeout(() => this.isLoading.set(false), 500);
    }

    protected onTodoDeleted(todo: Todo) {
        this.todoList.update(todos => todos.filter(t => t.id !== todo.id));
    }

    protected onTodoAdded(text: string) {
        this.todoList.update(todos => {
            const maxId = Math.max(0, ...todos.map(t => t.id));
            return [...todos, { id: maxId + 1, text }];
        });
    }

    private initTodoList() {
        const todos = [];
        for (let i = 0; i < 5; i++) {
            const id = i + 1;
            todos.push({id, text: `todo #${id}`});
        }

        this.todoList.set(todos);
    }
}
