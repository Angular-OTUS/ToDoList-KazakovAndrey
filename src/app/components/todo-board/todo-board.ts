import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';
import { Todo } from 'src/app/models/Todo';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-board',
    templateUrl: './todo-board.html',
})
export class TodoBoard {

    private readonly todoService = inject(TodoService);

    protected readonly inProgress = computed<Todo[]>(() => {
        const todoList = this.todoService.todoList();
        return todoList.filter(t => t.status === 'IN_PROGRESS');
    });

    protected readonly completed = computed<Todo[]>(() => {
        const todoList = this.todoService.todoList();
        return todoList.filter(t => t.status === 'COMPLETED');
    });
}
