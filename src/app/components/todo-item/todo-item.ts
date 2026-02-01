import { ChangeDetectionStrategy, output, input, Component } from '@angular/core';
import { AppButton } from 'src/app/components/app-button/app-button';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-item',
    templateUrl: './todo-item.html',
    imports: [
        AppButton,
        AppHint,
    ],
})
export class TodoItem {

    readonly todo = input.required<Todo>();
    readonly selected = input.required<boolean>();
    readonly todoDeleted = output<void>();
    readonly todoClicked = output<void>();

    protected onDelete() {
        this.todoDeleted.emit();
    }

    protected onClick() {
        this.todoClicked.emit();
    }
}
