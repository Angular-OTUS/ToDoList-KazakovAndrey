import { ChangeDetectionStrategy, signal, Component, OnInit, computed } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodoDesc } from 'src/app/components/todo-desc/todo-desc';
import { TodoInput } from "src/app/components/todo-input/todo-input";
import { TodoItem } from 'src/app/components/todo-item/todo-item';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { TodoInputData } from "src/app/models/TodoInputData";

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
    protected readonly todoList = signal<Todo[]>([]);

    protected readonly selectedItemId = signal<number| null>(null);
    protected readonly description = computed<string | null>(() => {
        const itemId = this.selectedItemId();
        const selectedTodo = this.todoList().find(item => item.id === itemId);

        return selectedTodo?.description ?? null;
    });

    ngOnInit() {

        setTimeout(() => this.isLoading.set(false), 500);

        const todoList = this.getTodoList();
        this.todoList.set(todoList)

        const firstTodo = todoList.at(0);
        this.selectedItemId.set(firstTodo?.id ?? null);
    }

    protected onTodoDeleted(todo: Todo) {
        this.todoList.update(todos => todos.filter(t => t.id !== todo.id));

        if (this.selectedItemId() === todo.id) {
            this.selectedItemId.set(null);
        }
    }

    protected onTodoAdded(data: TodoInputData) {
        this.todoList.update(todos => {
            const maxId = Math.max(0, ...todos.map(t => t.id));
            return [
                ...todos,
                {
                    id: maxId + 1,
                    text: data.text,
                    description: data.description,
                }
            ];
        });
    }

    protected onTodoClicked(todo: Todo) {
        this.selectedItemId.set(todo.id);
    }

    private getTodoList() {
        const todos = [];
        for (let i = 0; i < 5; i++) {
            const id = i + 1;
            todos.push({id, text: `todo #${id}`, description: `description #${id}`});
        }

        return todos;
    }
}
