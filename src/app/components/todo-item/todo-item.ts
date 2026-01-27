import { ChangeDetectionStrategy, output, input, Component } from "@angular/core";
import { AppButton } from "src/app/components/app-button/app-button";
import { Todo } from "src/app/models/Todo";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-todo-item",
    templateUrl: "./todo-item.html",
    imports: [
        AppButton,
    ],
})
export class TodoItem {

    readonly todo = input.required<Todo>();
    readonly todoDeleted = output<void>();

    protected onDelete() {
        this.todoDeleted.emit();
    }
}
