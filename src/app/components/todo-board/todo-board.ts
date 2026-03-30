import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';
import { Todo } from 'src/app/models/Todo';
import { AppSpinner } from 'src/app/components/app-spinner/app-spinner';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-board',
    templateUrl: './todo-board.html',
    imports: [
        AppSpinner
    ]
})
export class TodoBoard implements OnInit {

    private readonly todoService = inject(TodoService);

    protected readonly inProgress = computed<Todo[]>(() => {
        const todoList = this.todoService.todoList();
        return todoList.filter(t => t.status === 'IN_PROGRESS');
    });

    protected readonly completed = computed<Todo[]>(() => {
        const todoList = this.todoService.todoList();
        return todoList.filter(t => t.status === 'COMPLETED');
    });

    protected readonly isLoading = signal<boolean>(true);

    ngOnInit() {
        setTimeout(() => this.isLoading.set(false), 1000);
    }
}
