import { ChangeDetectionStrategy, signal, Component, OnInit, computed, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodoDesc } from 'src/app/components/todo-desc/todo-desc';
import { TodoInput } from "src/app/components/todo-input/todo-input";
import { TodoItem } from 'src/app/components/todo-item/todo-item';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { TodoInputData } from "src/app/models/TodoInputData";
import { ToastService } from "src/app/services/toast-service";
import { TodoService } from "src/app/services/todo-service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-list',
    templateUrl: './todo-list.html',
    imports: [
        TodoItem,
        TodoInput,
        MatProgressSpinner,
        TodoDesc,
        AppHint,
    ],
})
export class TodoList implements OnInit {

    protected readonly title = 'Todo List';
    protected readonly isLoading = signal<boolean>(true);

    protected readonly selectedItemId = signal<number| null>(null);
    protected readonly description = computed<string | null>(() => {
        const itemId = this.selectedItemId();
        const selectedTodo = this.todoService.todoList().find(item => item.id === itemId);

        return selectedTodo?.description ?? null;
    });

    private readonly todoService: TodoService = inject(TodoService);
    private readonly toastService: ToastService = inject(ToastService);

    ngOnInit() {

        setTimeout(() => this.isLoading.set(false), 500);

        const firstTodo = this.todoService.todoList().at(0);
        this.selectedItemId.set(firstTodo?.id ?? null);
    }

    protected get todoList() {
        return this.todoService.todoList();
    }

    protected onTodoDeleted(todo: Todo) {
        this.todoService.deleteTodo(todo.id);

        if (this.selectedItemId() === todo.id) {
            this.selectedItemId.set(null);
        }
    }

    protected onTodoAdded(data: TodoInputData) {
        this.todoService.addTodo(data)
        this.toastService.showToast("Todo added successfully");
    }

    protected onTodoUpdated(idx: number, data: TodoInputData) {
        this.todoService.updateTodo(idx, data);
        this.toastService.showToast("Todo updated successfully");
    }

    protected onTodoClicked(todo: Todo) {
        this.selectedItemId.set(todo.id);
    }
}
