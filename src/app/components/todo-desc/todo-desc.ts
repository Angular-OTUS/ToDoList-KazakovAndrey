import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { TodoService } from 'src/app/services/todo-service';
import { AppHint } from 'src/app/directives/app-hint';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoStatus } from 'src/app/models/TodoStatus';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-desc',
    imports: [
        MatFormField,
        MatInput,
        AppHint,
        MatCheckbox,
    ],
    templateUrl: './todo-desc.html',
})
export class TodoDesc {

    private readonly todoService = inject(TodoService);

    protected readonly todoId = input<string>();

    protected readonly todo = computed(() => {
        const id = this.todoId();
        const list = this.todoService.todoList();

        return list.find(t => t.id === id);
    })

    protected onTodoChecked(checked: boolean) {
        const todo = this.todo();
        if (!todo) {
            return;
        }

        const status: TodoStatus = checked ? 'COMPLETED' : 'IN_PROGRESS'

        this.todoService.updateTodoStatus(todo.id, { status })
    }
}
