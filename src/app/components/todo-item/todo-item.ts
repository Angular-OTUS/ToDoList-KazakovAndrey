import { ChangeDetectionStrategy, output, input, Component, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { AppButton } from 'src/app/components/app-button/app-button';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoData } from 'src/app/models/TodoData';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-item',
    templateUrl: './todo-item.html',
    imports: [
        AppButton,
        AppHint,
        FormsModule,
        MatFormField,
        MatInput,
        MatCheckbox,
    ],
    host: {
        '(click)': 'onClick()',
        '(dblclick)': 'onDblClick()',
    },
})
export class TodoItem {

    readonly todo = input.required<Todo>();
    readonly selected = input.required<boolean>();

    readonly todoDeleted = output<void>();
    readonly todoClicked = output<void>();
    readonly todoUpdated = output<TodoData>();
    readonly todoChecked = output<boolean>();

    readonly editing = signal<boolean>(false);

    protected currentText: string = '';

    @ViewChild('editInput')
    private readonly editInput?: ElementRef<HTMLInputElement>;

    private readonly editEffect = effect(() => {
        if (this.editing()) {
            queueMicrotask(() => this.editInput?.nativeElement.focus())
        }
    });

    protected onDelete() {
        this.todoDeleted.emit();
        this.editing.set(false);
    }

    protected onSave() {
        this.todoUpdated.emit(
            {
                title: this.currentText,
                description: this.todo().description,
            },
        );

        this.editing.set(false);
        this.currentText = '';
    }

    protected onClick() {
        this.todoClicked.emit();
    }

    protected onDblClick() {
        this.editing.set(true);
        this.currentText = this.todo().title;
    }
}
