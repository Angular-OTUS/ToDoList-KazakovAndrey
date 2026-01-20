import { Component } from "@angular/core";

@Component({
    selector: "app-todo-item",
    templateUrl: "./todo-item.html",
})
export class TodoItem {
    protected readonly text: string = "todo item";

    protected onDelete() {
        console.log("Delete item");
    };
}
