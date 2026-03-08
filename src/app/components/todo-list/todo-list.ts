import { ChangeDetectionStrategy, signal, Component, OnInit, computed, inject } from '@angular/core';
import { AppSpinner } from 'src/app/components/app-spinner/app-spinner';
import { TodoDesc } from 'src/app/components/todo-desc/todo-desc';
import { TodoItem } from 'src/app/components/todo-item/todo-item';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { ToastService } from 'src/app/services/toast-service';
import { TodoService } from 'src/app/services/todo-service';
import { TodoData } from 'src/app/models/TodoData';
import { TodoStatus } from 'src/app/models/TodoStatus';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CreateTodo } from 'src/app/components/create-todo/create-todo';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-list',
    templateUrl: './todo-list.html',
    imports: [
        TodoItem,
        TodoDesc,
        AppHint,
        AppSpinner,
        MatRadioButton,
        MatRadioGroup,
        CreateTodo,
    ],
})
export class TodoList implements OnInit {

    protected readonly title = 'Todo List';
    protected readonly isLoading = signal<boolean>(true);
    protected readonly filterBy = signal<'all' | TodoStatus>('all');

    protected readonly selectedItemId = signal<number| null>(null);
    protected readonly description = computed<string | null>(() => {
        const itemId = this.selectedItemId();
        const selectedTodo = this.todoService.todoList().find(item => item.id === itemId);

        return selectedTodo?.description ?? null;
    });
    protected todoList = computed<Todo[]>(() => this.todoService.todoList());

    private readonly todoService: TodoService = inject(TodoService);
    private readonly toastService: ToastService = inject(ToastService);

    ngOnInit() {

        setTimeout(() => this.isLoading.set(false), 500);

        const firstTodo = this.todoService.todoList().at(0);
        this.selectedItemId.set(firstTodo?.id ?? null);
    }

    protected onTodoDeleted(todo: Todo) {
        this.todoService.deleteTodo(todo.id);

        if (this.selectedItemId() === todo.id) {
            this.selectedItemId.set(null);
        }
    }

    protected onTodoAdded(data: TodoData) {
        this.todoService.addTodo(data)
        this.toastService.showToast('Todo added successfully');
    }

    protected onTodoUpdated(idx: number, data: TodoData) {
        this.todoService.updateTodo(idx, data);
        this.toastService.showToast('Todo updated successfully');
    }

    protected onTodoClicked(todo: Todo) {
        this.selectedItemId.set(todo.id);
    }

    protected onTodoChecked(idx: number, checked: boolean) {
        const status: TodoStatus = checked ? 'COMPLETED' : 'IN_PROGRESS';
        this.todoService.updateTodo(idx, { status })
    }
}
