import { Component } from "@angular/core";
import { TodoInput } from "src/app/components/todo-input/todo-input";
import { TodoItem } from "src/app/components/todo-item/todo-item";

@Component({
    selector: "app-todo-list",
    templateUrl: "./todo-list.html",
    imports: [
        TodoItem,
        TodoInput,
    ],
})
export class TodoList {

    protected readonly title = "Todo List";
}
