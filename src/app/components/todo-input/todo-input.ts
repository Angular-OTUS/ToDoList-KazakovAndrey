import { output, computed, signal, Component, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInput, MatFormField } from "@angular/material/input";
import { AppButton } from "src/app/components/app-button/app-button";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-todo-input",
    templateUrl: "./todo-input.html",
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        AppButton,
    ],
})
export class TodoInput {

    protected readonly todoInput = signal<string | null>(null);

    protected readonly isAddButtonDisabled = computed<boolean>(() => {
        const input = this.todoInput();
        return !input;
    });

    protected readonly todoAdded = output<string>();

    protected onAdd(): void {
        const input = this.todoInput();
        if (input) {
            this.todoAdded.emit(input);
            this.todoInput.set(null);
        }
    }
}
