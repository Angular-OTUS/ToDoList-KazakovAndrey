import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { TodoService } from 'src/app/services/todo-service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-desc',
    imports: [
        MatFormField,
        MatInput,
    ],
    templateUrl: './todo-desc.html',
})
export class TodoDesc {

    protected readonly todoId = input.required<string | null>();

    protected readonly todoDesc = computed(() => {
        const id = Number(this.todoId());
        const list = this.todoService.todoList();

        return list.find(t => +t.id === id)?.description ?? null;
    });

    private readonly todoService = inject(TodoService);
}
