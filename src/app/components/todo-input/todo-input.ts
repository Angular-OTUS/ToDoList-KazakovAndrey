import { Component } from "@angular/core";

@Component({
    selector: "app-todo-input",
    templateUrl: "./todo-input.html",
})
export class TodoInput {

    protected onAdd(event: Event): void {
        console.log("Add item");
    }
}
