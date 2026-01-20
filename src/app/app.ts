import { Component } from "@angular/core";
import { TodoList } from "src/app/components/todo-list/todo-list";

@Component({
    selector: "app-root",
    templateUrl: "./app.html",
    imports: [
        TodoList,
    ],
})
export class App {

}
