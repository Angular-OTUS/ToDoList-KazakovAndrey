import { output, computed, signal, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput, MatFormField } from '@angular/material/input';
import { AppButton } from 'src/app/components/app-button/app-button';
import { AppHint } from 'src/app/directives/app-hint';

export type TodoInputData = {
    text: string;
    description: string | null;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-input',
    templateUrl: './todo-input.html',
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        AppButton,
        AppHint,
    ],
})
export class TodoInput {

    protected readonly textInput = signal<string | null>(null);
    protected readonly descriptionInput = signal<string | null>(null);

    protected readonly isAddButtonDisabled = computed<boolean>(() => {
        const input = this.textInput();
        return !input;
    });

    protected readonly todoAdded = output<TodoInputData>();

    protected onAdd(): void {
        const text = this.textInput();
        const description = this.descriptionInput();
        if (text) {
            this.todoAdded.emit({text, description});
            this.textInput.set(null);
            this.descriptionInput.set(null);
        }
    }
}
