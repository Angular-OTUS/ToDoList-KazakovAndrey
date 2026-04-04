import { ChangeDetectionStrategy, output, input, Component, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { AppButton } from 'src/app/components/app-button/app-button';
import { AppHint } from 'src/app/directives/app-hint';
import { Todo } from 'src/app/models/Todo';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoContentData } from 'src/app/models/TodoContentData';
import { RouterLinkActive } from '@angular/router';

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
        RouterLinkActive,
    ],
    host: {
        '(dblclick)': 'onDblClick()',
    },
})
export class TodoItem {

    readonly todo = input.required<Todo>();

    readonly todoDeleted = output<void>();
    readonly todoUpdated = output<TodoContentData>();
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
        this.todoUpdated.emit({ title: this.currentText });

        this.editing.set(false);
        this.currentText = '';
    }

    protected onDblClick() {
        this.editing.set(true);
        this.currentText = this.todo().title;
    }
}
