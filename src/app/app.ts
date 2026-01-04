import { Component } from "@angular/core";
import { TodoInput } from "src/app/components/todo-input/todo-input";
import { TodoList } from "src/app/components/todo-list/todo-list";

@Component({
    selector: "app-root",
    templateUrl: "./app.html",
    imports: [
        TodoList,
        TodoInput,
    ],
})
export class App {

    protected readonly title = "Todo List";
}
