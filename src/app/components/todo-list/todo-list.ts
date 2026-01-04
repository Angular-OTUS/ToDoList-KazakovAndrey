import { Component } from "@angular/core";
import { TodoItem } from "src/app/components/todo-item/todo-item";

@Component({
    selector: "app-todo-list",
    templateUrl: "./todo-list.html",
    imports: [
        TodoItem,
    ],
})
export class TodoList {

}
