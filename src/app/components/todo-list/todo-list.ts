import { ChangeDetectionStrategy, signal, Component, OnInit, computed, inject } from '@angular/core';
import { AppSpinner } from 'src/app/components/app-spinner/app-spinner';
import { TodoItem } from 'src/app/components/todo-item/todo-item';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo-service';
import { CreateTodoData } from 'src/app/models/CreateTodoData';
import { TodoStatus } from 'src/app/models/TodoStatus';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CreateTodo } from 'src/app/components/create-todo/create-todo';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TodoContentData } from 'src/app/models/TodoContentData';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-list',
    templateUrl: './todo-list.html',
    imports: [
        TodoItem,
        AppHint,
        AppSpinner,
        MatRadioButton,
        MatRadioGroup,
        CreateTodo,
        RouterLink,
        RouterOutlet,
    ],
})
export class TodoList implements OnInit {

    protected readonly title = 'Todo List';
    protected readonly isLoading = signal<boolean>(true);
    protected readonly filterBy = signal<'all' | TodoStatus>('all');

    protected todoList = computed<Todo[]>(() => this.todoService.todoList());
    protected filteredToList = computed<Todo[]>(() => {
        const status = this.filterBy();
        const todos = this.todoList();

        return status === 'all' ? todos : todos.filter(item => item.status === status);
    });

    private readonly todoService = inject(TodoService);
    private readonly router = inject(Router);

    ngOnInit() {
        setTimeout(() => this.isLoading.set(false), 500);
    }

    protected onTodoDeleted(todo: Todo) {
        this.todoService.deleteTodo(todo.id);

        if (this.router.url.endsWith(`/${todo.id}`)) {
            this.router.navigate(['/tasks']);
        }
    }

    protected onTodoAdded(data: CreateTodoData) {
        this.todoService.addTodo(data)
    }

    protected onTodoContentUpdated(idx: string, data: TodoContentData) {
        this.todoService.updateTodoContent(idx, data);
    }

    protected onTodoChecked(idx: string, checked: boolean) {
        const status: TodoStatus = checked ? 'COMPLETED' : 'IN_PROGRESS';
        this.todoService.updateTodoStatus(idx, { status })
    }
}
