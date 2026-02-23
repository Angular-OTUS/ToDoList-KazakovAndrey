import { ChangeDetectionStrategy, output, input, Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatFormField } from "@angular/material/input";
import { AppButton } from "src/app/components/app-button/app-button";
import { AppHint } from "src/app/directives/app-hint";
import { Todo } from "src/app/models/Todo";
import { TodoInputData } from "src/app/models/TodoInputData";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-todo-item",
    templateUrl: "./todo-item.html",
    imports: [
        AppButton,
        AppHint,
        FormsModule,
        MatFormField,
        MatInput,
    ],
    host: {
        "(click)": "onClick()",
        "(dblclick)": "onDblClick()",
    },
})
export class TodoItem {

    readonly todo = input.required<Todo>();

    readonly selected = input.required<boolean>();

    readonly todoDeleted = output<void>();

    readonly todoClicked = output<void>();

    readonly todoUpdated = output<TodoInputData>();

    readonly editing = signal<boolean>(false);

    protected currentText: string = "";

    protected onDelete() {
        this.todoDeleted.emit();
        this.editing.set(false);
    }

    protected onSave() {
        this.todoUpdated.emit(
            {
                text: this.currentText,
                description: this.todo().description,
            },
        );

        this.editing.set(false);
        this.currentText = "";
    }

    protected onClick() {
        this.todoClicked.emit();
    }

    protected onDblClick() {
        this.editing.set(true);
        this.currentText = this.todo().text;
    }
}
