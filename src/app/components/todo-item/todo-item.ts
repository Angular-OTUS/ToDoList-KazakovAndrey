import { ChangeDetectionStrategy, output, input, Component } from "@angular/core";
import { Todo } from "src/app/models/Todo";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-todo-item",
    templateUrl: "./todo-item.html",
})
export class TodoItem {

    readonly todo = input.required<Todo>();
    readonly todoDeleted = output<void>();

    protected onDelete() {
        this.todoDeleted.emit();
    }
}
